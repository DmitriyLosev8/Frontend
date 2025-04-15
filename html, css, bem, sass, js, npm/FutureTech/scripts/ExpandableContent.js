import pxToRem from "./utils/pxToRem.js"

const rootSelector = '[data-js-expandable-content]'

class ExpandableContent {
  selectors = {
    root: rootSelector,
    button: '[data-js-expandable-content-button]',
  }

  stateClasses = {
    isExpanded: 'is-expanded',
  }

  animationParams = {  //для метода animate
    duration: 500,
    easing: 'ease',
  }

  constructor(rootElement) {
      this.rootElement = rootElement
      this.buttonElement = this.rootElement.querySelector(this.selectors.button)
      this.bindEvents()  
  }

  expand () {
    const {offsetHeight, scrollHeight} = this.rootElement   //деструктурируем свойства из корневого элемента (значения текущей высоты и высоты всего элемента с учетом скрола)
    this.rootElement.classList.add(this.stateClasses.isExpanded)
    
    // animate принимает массив ключевых кадров и параметры анимации, каждый ключевой кадр - это объект с css свойствами
    this.rootElement.animate([
      {
        maxHeight: `${pxToRem(offsetHeight)}rem`  //первый ключевой кадр используя утилитарную функцию pxToRem
      },
      {
        maxHeight: `${pxToRem(scrollHeight)}rem`  //второй ключевой кадр используя утилитарную функцию pxToRem
      },
    ],this.animationParams)  //параметры анимации

  }


  onButtonClick = () => {
    this.expand()  

  }

  bindEvents() {
    this.buttonElement.addEventListener('click',this.onButtonClick)
  }
}

class ExpandableContentCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new ExpandableContent(element)
    })  
  }
}

export default ExpandableContentCollection