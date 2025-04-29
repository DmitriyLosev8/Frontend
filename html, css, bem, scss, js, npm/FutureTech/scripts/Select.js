import BaseComponent from './BaseComponent.js'
import MatchMedia from './MatchMedia.js'

const rootSelector = '[data-js-select]'


class Select extends BaseComponent{
  selectors = {
    root: rootSelector,
    originalControl: '[data-js-select-original-control]',
    button: '[data-js-select-button]',
    dropdown: '[data-js-select-dropdown]',
    option: '[data-js-select-option]',
  }

  stateClasses = {
    isExpanded: 'is-expanded',
    isSelected: 'is-selected',
    isCurrent: 'is-current',
    isOnTheLeftSide: 'is-on-the-left-side',
    isOnTheRightSide: 'is-on-the-right-side',
  }

  stateAttributes =  {
    ariaExpanded: 'aria-expanded',
    ariaSelected: 'aria-selected',
    ariaActiveDescendant: 'aria-activedescendant',
  }

  initialState = {
    isExpanded: false,
    currentOptionIndex: null,
    selectedOptionElement: null,

  }

  constructor(rootElement) {
      super()
      this.rootElement = rootElement
      this.originalControlElement = this.rootElement.querySelector(this.selectors.originalControl)
      this.buttonElement = this.rootElement.querySelector(this.selectors.button)
      this.dropdownElement = this.rootElement.querySelector(this.selectors.dropdown)
      this.optionElements = this.dropdownElement.querySelectorAll(this.selectors.option)
      this.state = this.getProxyState({
        ...this.initialState,  // через спред оператор присвоили значения initialState и дальше присваеваем им значения
        currentOptionIndex: this.originalControlElement.selectedIndex, //у оргинильного элемента  selected есть ствойство индекс, возвращающий число(индекс текущей выбранной опции)
        selectedOptionElement:  this.optionElements[this.originalControlElement.selectedIndex]  //из массива всех опций находим нужную по найденному индексу
      })
      this.fixDropdownPosition()
      this.updateTabIndexes()
      this.bindEvents()

  }

  updateUI(){
    const {
      isExpanded,
      currentOptionIndex,
      selectedOptionElement,
    } = this.state

    const newSelectedOptionValue = selectedOptionElement.textContent.trim() 

    const updateOriginalControl = () => {
      this.originalControlElement.value = newSelectedOptionValue  //обновляем текст внутри выбранного элемента select
    }
    
    const updateButton = () => {
      this.buttonElement.textContent = newSelectedOptionValue  //обновляем текст внутри кнопки у выбранного элемента select
      this.buttonElement.classList.toggle(this.stateClasses.isExpanded, isExpanded)
      this.buttonElement.setAttribute(this.stateAttributes.ariaExpanded, isExpanded)
      this.buttonElement.setAttribute(this.stateAttributes.ariaActiveDescendant, 
        this.optionElements[currentOptionIndex].id  //обращаемся к списку дом элемента опций, по индексу получаем ссылку на конкретный дом-элемент 
        // текущей опции и читаем его атрибут id (это вот такие айдишники id="phone-number-prefix-select-option-3" у элемента select__option)
      )

    }
    
    const updateDropdown = () => {
      this.dropdownElement.classList.toggle(this.stateClasses.isExpanded, isExpanded)
    }
    
    const updateOptions = () => {
      this.optionElements.forEach((optionElement, index) => {
        const isCurrent = currentOptionIndex === index
        const isSelected = selectedOptionElement === optionElement

        optionElement.classList.toggle(this.stateClasses.isCurrent, isCurrent)
        optionElement.classList.toggle(this.stateClasses.isSelected, isSelected)
        optionElement.setAttribute(this.stateAttributes.ariaSelected, isSelected)
      })
    }
    
    updateOriginalControl()
    updateButton()
    updateDropdown()
    updateOptions()
  }

  toggleExpandedState () {
    this.state.isExpanded = !this.state.isExpanded
  }

  expand() {
    this.state.isExpanded = true
  }

  collapse() {
    this.state.isExpanded = false
  }

  fixDropdownPosition () {
      const viewportWidth = document.documentElement.clientWidth
      const halfViewportX = viewportWidth / 2  // получаем серидину вюпорта
      const {width, x} = this.buttonElement.getBoundingClientRect()  //получаем значения ширины кнопки и координаты x относительно вьюпорта
      const buttonCenterX = x + width / 2  //получаем координаты центра кнопки по оси x
      const isButtonOnTheLeftViewportSide =  buttonCenterX < halfViewportX  //понимаем находится ли кнопка в левой части вьюпорта или нет

      this.dropdownElement.classList.toggle(  //если да, то добавляем элементу класс is-on-the-left-side
        this.stateClasses.isOnTheLeftSide,
        isButtonOnTheLeftViewportSide
      )

      this.dropdownElement.classList.toggle(  
        this.stateClasses.isOnTheRightSide,
        !isButtonOnTheLeftViewportSide //если НЕТ, то добавляем элементу класс is-on-the-right-side
      )
  } 

  updateTabIndexes(isMobileDevice = MatchMedia.mobile.matches) {
    this.originalControlElement.tabIndex = isMobileDevice ? 0 : -1
    this.buttonElement.tabIndex = isMobileDevice ? -1 : 0
  }

  get isNeedToExpand() {
    const isButtonFocuced = document.activeElement === this.buttonElement

    return (!this.state.isExpanded && isButtonFocuced)
  }

  selectCurrentOption() {
    this.state.selectedOptionElement = this.optionElements[this.state.currentOptionIndex]
  }

  onButtonClick = () => {
    this.toggleExpandedState()
  }

  onClick = (event) => {
      const {target} = event  //деструктурируем target, чтобы понять куда кликнули
      const isButtonClick = target === this.buttonElement  //понимаем, что клик был не по кнопке
      const isOutsideDropDownClick = target.closest(this.selectors.dropdown) !== this.dropdownElement  //понимаем, что клик был и не по текущему дропдаун элементу(когда он открыт)
     

      if(!isButtonClick && isOutsideDropDownClick) {
        this.collapse()
        return
      }

      const isOptionClick = target.matches(this.selectors.option)  //понимаем, что клик был по одной из опций

      if (isOptionClick) {
        this.state.selectedOptionElement = target
        this.state.currentOptionIndex = [...this.optionElements]  //структуру нодлист делам массивом дом элементов, чтобы вызвать метод findIndex
        .findIndex((optionElement) => optionElement === target)  //в итоге в  this.state.currentOptionIndex записываем индекс опции, по которой был клик 
        //(то есть, когда вот тут optionElement === target произойдёт true, то индекс этой опции запишется в свойство this.state.currentOptionIndex)
        this.collapse()
      }
  }

  onArrowUpKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    if (this.state.currentOptionIndex > 0) {
      this.state.currentOptionIndex--
    }
  }

  onArrowDownKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    if (this.state.currentOptionIndex < this.optionElements.length - 1) {
      this.state.currentOptionIndex++
    }
  }

  onSpaceKeyDown = () => {
    if(this.isNeedToExpand) {
      this.expand()
      return
    }

    this.selectCurrentOption()
    this.collapse()
  }

  onEnterKeyDown = () => {
    if(this.isNeedToExpand) {
      this.expand()
      return
    }

    this.selectCurrentOption()
    this.collapse()
  }

  onKeyDown = (event) => {
    const {code} = event  //деструктурируем поле code, чтобы определить какая кнопка была нажата

    const action = {   //имена свойств ниже совпадут с именами из поля code объекта event
      ArrowUp: this.onArrowUpKeyDown,
      ArrowDown: this.onArrowDownKeyDown,
      Space: this.onSpaceKeyDown, 
      Enter: this.onEnterKeyDown, 
    }[code]  //вот тут берём значения из  code. По итогу  в action будет или одна из функций обработчиков, или undefined

    if(action) {  //если  action true, а true она будет, только если была нажата клавиша, которая есть в action
      event.preventDefault()  //отменяем поведение браузера по умолчанию
      action()
    }
  }

  onMobileMatchMediaChange =  (event)  => {
    this.updateTabIndexes(event.matches)  //тут хранится инфа о текущей ширине вьюпорта
  }

  onOriginalControlChange = () => {
    this.state.selectedOptionElement = this.optionElements[this.originalControlElement.selectedIndex]
  }

  bindEvents() {
    MatchMedia.mobile.addEventListener('change', this.onMobileMatchMediaChange)  //подписываемся на изменения ширины
    this.buttonElement.addEventListener('click', this.onButtonClick)
    document.addEventListener('click', this.onClick)
    this.rootElement.addEventListener('keydown', this.onKeyDown)
    this.originalControlElement.addEventListener('change', this.onOriginalControlChange)
  }


}

class SelectCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Select(element)
    })
  }
}

export default SelectCollection