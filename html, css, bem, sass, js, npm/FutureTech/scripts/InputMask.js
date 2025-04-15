const rootSelector = '[data-js-input-mask]'


class InputMask {
  constructor(rootElement) {
      this.rootElement = rootElement
      this.init()
  }

  init () {
    const isLibReady = typeof window.IMask !== 'undefined'

    if(isLibReady) {
      window.IMask(this.rootElement, {
        mask: this.rootElement.dataset.jsInputMask  // берём инфу о маске из значения атрибута data-js-input-mask, то есть (000) 000-00-00, где нули - это любые числа
      })
    }
    else {
      console.error('Библиотека "IMask" не подключена!')
    }
  }
}

class InputMaskCollection {
  
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new InputMask(element)
    })  
  }
}

export default InputMaskCollection