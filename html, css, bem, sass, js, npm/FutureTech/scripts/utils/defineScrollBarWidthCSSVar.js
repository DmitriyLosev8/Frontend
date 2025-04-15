const defineScrollBarWidthCSSVar = () => {
  document.documentElement.style.setProperty(
    '--scrollbar-width',
    `${window.innerWidth - document.documentElement.clientWidth}px`  //вычисляем ширину горизонтального скроллбара
  )
}

export default defineScrollBarWidthCSSVar