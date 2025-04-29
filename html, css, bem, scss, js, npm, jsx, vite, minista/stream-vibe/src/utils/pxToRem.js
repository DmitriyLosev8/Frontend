const pxToRem = (pixels) => {
    const htmlElementFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)

    return pixels / htmlElementFontSize
}

export default pxToRem