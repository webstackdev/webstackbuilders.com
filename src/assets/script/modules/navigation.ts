import createFocusTrap from 'focus-trap'
import debounce from 'lodash/debounce'
import { getWindowDimensions } from './utils'

const SELECTORS = {
  nav: '.js-nav',
  menu: '.js-nav-menu',
  toggleBtn: '.js-nav-toggle',
}

const CLASSES = {
  noScroll: 'no-scroll',
  navOpen: 'nav--open',
  navMenuVisible: 'nav__menu--visible',
}

class Navigation {
  constructor() {
    this.isOpen = false

    this.nav = document.querySelector(SELECTORS.nav)
    this.menu = this.nav.querySelector(SELECTORS.menu) // @TODO: Object is possibly 'null'
    this.toggleBtn = this.nav.querySelector(SELECTORS.toggleBtn) // @TODO: Object is possibly 'null'

    this.focusTrap = createFocusTrap(this.nav, {
      onDeactivate: () => this.toggleMenu(false),
    })

    this.bindEvents()
  }

  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.toggleMenu()) // @TODO: Object is possibly 'null'
    window.addEventListener('resize', debounce(Navigation.setScreenDiameter, 200))

    Navigation.setScreenDiameter()
  }

  toggleMenu(force) {
    // @TODO: Parameter 'force' implicitly has an 'any' type
    this.isOpen = typeof force === 'boolean' ? force : !this.isOpen

    document.body.classList.toggle(CLASSES.noScroll, this.isOpen) // @TODO: Object is possibly 'null'
    this.nav.classList.toggle(CLASSES.navOpen, this.isOpen) // @TODO: Object is possibly 'null'
    this.toggleBtn.setAttribute('aria-expanded', String(this.isOpen))

    // @TODO: Object is possibly 'null'
    window.setTimeout(() => {
      this.menu.classList.toggle(CLASSES.navMenuVisible, this.isOpen)
    }, 50)

    if (this.isOpen) {
      this.focusTrap.activate()
    } else {
      this.focusTrap.deactivate()
    }
  }

  static setScreenDiameter() {
    const screen = getWindowDimensions()
    const diameter = Math.sqrt(screen.height ** 2 + screen.width ** 2)
    document.documentElement.style.setProperty('--diameter', `${diameter}px`)
  }
}

if (document.querySelector(SELECTORS.nav)) {
  new Navigation()
}
