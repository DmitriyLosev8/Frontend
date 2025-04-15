import pxTorem from './utils/pxToRem.js'

const MatchMedia = {
  mobile: window.matchMedia(`(width <= ${pxTorem(767.98)}rem)`), // в свойстве matches этого объекта, получим бул о ширине вюпорта, меньше 767.98px или нет
}

export default MatchMedia