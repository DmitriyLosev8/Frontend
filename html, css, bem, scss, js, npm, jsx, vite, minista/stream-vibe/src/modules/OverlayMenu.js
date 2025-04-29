class OverlayMenu {
    selectors = {
        root: '[data-js-overlay-menu]',
        dialog: '[data-js-overlay-menu-dialog]',
        burgerButton: '[data-js-overlay-menu-burger-button]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor () {
        this.rootElement = document.querySelector(this.selectors.root);
        this.dialoglement = this.rootElement.querySelector(this.selectors.dialog);
        this.burgerButtonlement = this.rootElement.querySelector(this.selectors.burgerButton);
        this.bindEvens()
    }

    onBurgerButtonClick = () => {
        this.burgerButtonlement.classList.toggle(this.stateClasses.isActive);
        this.dialoglement.open = !this.dialoglement.open  //просто меняем на противоположное (некий toggle)
        document.documentElement.classList.toggle(this.stateClasses.isLock);
    }

    bindEvens() {
        this.burgerButtonlement.addEventListener('click', this.onBurgerButtonClick)
    }
}

export default OverlayMenu;