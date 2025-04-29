class BaseComponent {
    constructor() {
        if(this.constructor === BaseComponent) {
            throw new Error('Невозможно создать экземпляр абстракного класса BaseComponent')
        }
    }

    getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop]
            },
            set: (target, prop, newValue) => {
                const oldValue = target[prop]
                target[prop] = newValue

                if(newValue !== oldValue) {
                    this.updateUI()
                }

                return true
            },
        })
    }

    updateUI() {  //перерисовка ui в ответ на обновление состояния
        throw new Error('Реализуй метод updateUI')
    }
}

export default BaseComponent