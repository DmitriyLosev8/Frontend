import BaseComponent from './BaseComponent.js'

const rootSelector = '[data-js-tabs]'

class Tabs  extends BaseComponent{
  selectors = {
    root: rootSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  }



  constructor(rootElement) {
      super()  //активация функционала класса, от которого мы расширились
      this.rootElement = rootElement
      this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
      this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
      
      // this.state = {    //вариант без прокси
      //   activeTabIndex: [...this.buttonElements].findIndex((buttonElement) => {
      //     buttonElement.classList.contains(this.stateClasses.isActive)  //проверяет активен ли конкретный элемент, у которого экземпляр этого класса сейчас, то есть найдём активную кнопку
      //   })
      // }

      this.state = this.getProxyState(   //вариант с прокси
        {   
          activeTabIndex: [...this.buttonElements].findIndex((buttonElement) => {
            buttonElement.classList.contains(this.stateClasses.isActive)  //проверяет активен ли конкретный элемент, у которого экземпляр этого класса сейчас, то есть найдём активную кнопку
          })
        }
      ) 
      this.limitTabsIndex = this.buttonElements.length -1  //получим лимит индекса табов, чтобы корректно обработать управление табами с клавиатуры влево и вправо, конкретно это  - последний элемент(таб)
      this.bindEvents()
  }

  updateUI(){
    const{ activeTabIndex} = this.state
    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === activeTabIndex  //узнаём является ли текущая кнопка активной, или должна ли она стать активной
      buttonElement.classList.toggle(this.stateClasses.isActive, isActive)  //и если должна стать активной, добавляем соответствующий класс этой кнопке
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())  //обновляем атрибут ariaSelected
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')  //обновляем атрибут tabIndex
    })

    this.contentElements.forEach((contentElement,index) => {
      const isActive = index === activeTabIndex  //тут тоже самое
      contentElement.classList.toggle(this.stateClasses.isActive, isActive)  
    })
  }

  activateTab (newTabIndex) {
    this.state.activeTabIndex = newTabIndex
    this.buttonElements[newTabIndex].focus()
  }

  previosTab  = () => {
    const newTabIndex = this.state.activeTabIndex === 0
    ? this.limitTabsIndex
    : this.state.activeTabIndex -1   //если сейчас активный первый таб, то переключаем на последний, в ином случае на предыдущий

    this.activateTab(newTabIndex)
  }

  nextTab = () => {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
    ? 0
    : this.state.activeTabIndex + 1   //если сейчас активный последний таб, то переключаем на первый, в ином случае на следующий

    this.activateTab(newTabIndex)
  }

  firstTab = () => {
    this.activateTab(0)
  }

  lastTab = () => {
    this.activateTab(this.limitTabsIndex)
  }



  onButtonClick(buttonIndex) {
    this.state.activeTabIndex = buttonIndex  //обновляет состояние, делает кновку активной по индексу
    //this.updateUI() //вариант без проксирования
  }

  onKeyDown = (event) => {  //стрелочная, чтобы в привязке всё сработало. Получаем объект event и деструктурируем code и metaKey
    const {code, metaKey} = event  //из  code получаем назвапние клавиш ArrowLeft, ArrowRight, Home и End

    const action = {
      ArrowLeft: this.previosTab,
      ArrowRight: this.nextTab,
      Home: this.firstTab,
      End: this.lastTab,
    }[code]

    const isMackHomeKey = metaKey && code === 'ArrowLeft'

    if(isMackHomeKey) {
      this.firstTab()
      //this.updateUI() //вариант без проксирования
      return
    }

    const isMackEndKey = metaKey && code === 'ArrowRight'

    if(isMackEndKey) {
      this.lastTab()
      //this.updateUI() //вариант без проксирования
      return
    }
    
    action?.()
    
    // if(action) {  //если action не undefind, то есть нажата та клавиша, которую мы ожидаем, то вызовится соответствующий метод
    //   action()
    //   //this.updateUI() //вариант без проксирования
    // } 
  }


  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {   //подписываемся на клик для каждой кнопки и при клике передаём индекс
      buttonElement.addEventListener('click', () => this.onButtonClick(index))
    })
    this.rootElement.addEventListener('keydown', this.onKeyDown) //вешаем событие на корневой элемент 
  }
}

class TabsCollection {
  
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Tabs(element)
    })  
  }
}

export default TabsCollection