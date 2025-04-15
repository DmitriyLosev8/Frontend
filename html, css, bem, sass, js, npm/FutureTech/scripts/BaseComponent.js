class BaseComponent {
  constructor() {
    if(this.constructor === BaseComponent) {
      throw new Error('Невозможно создать экземпляр абстрактного класса BaseComponent')
    }
    }

  getProxyState(initialState) {
    return new Proxy(initialState, {   // Proxy - встроенный в JS класс
    
    get: (target, prop) => {  // target - это проксируемый объект, prop - имя свойства
       return target[prop]
     },   
     set: (target, prop, newValue) => {
       const oldValue = target[prop]  //значение до внесение изменений
      
      target[prop] = newValue
       
      if(newValue !== oldValue) {
        this.updateUI()  //будет выполняться каждый раз, когда в this.state в объекте поменялись какие-то значения, activeTabIndex например
      }
       
      return true  //возвращаем true для того, чтобы показать, что обновление в проксируемом объекте выполнено успешно
     },
    })
  }

 
  updateUI () {  //перерисовка UI в ответ на обновление состояния
    throw new Error('Необходимо реализовать метод updateUI')
  }
}

export default BaseComponent

