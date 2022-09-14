import { createFocusTrap } from 'focus-trap'
import debounce from 'lodash/debounce'
import type { FocusTrap } from 'focus-trap'
import {
  getNavElement,
  getNavMenuElement,
  getNavMenuToggleBtnElement,
  getWindowDimensions
} from './utils'

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
  isOpen: boolean
  nav: HTMLElement
  menu: HTMLUListElement
  toggleBtn: HTMLButtonElement
  focusTrap: FocusTrap

  constructor() {
    this.isOpen = false
    this.nav = getNavElement(SELECTORS.nav)
    this.menu = getNavMenuElement(this.nav, SELECTORS.menu)
    this.toggleBtn = getNavMenuToggleBtnElement(this.nav, SELECTORS.toggleBtn)
    this.focusTrap = createFocusTrap(this.nav, {
      onDeactivate: () => this.toggleMenu(false),
    })
  }

  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.toggleMenu())
    window.addEventListener('resize', debounce(Navigation.setScreenDiameter, 200))
    Navigation.setScreenDiameter()
  }

  toggleMenu(force?: boolean) {
    this.isOpen = force !== undefined ? force : !this.isOpen
    document.body.classList.toggle(CLASSES.noScroll, this.isOpen)
    this.nav.classList.toggle(CLASSES.navOpen, this.isOpen)
    this.toggleBtn.setAttribute('aria-expanded', String(this.isOpen))

    window.setTimeout(() => {
      this.menu.classList.toggle(CLASSES.navMenuVisible, this.isOpen)
    }, 50)

    if (this.isOpen) {
      this.focusTrap.activate()
    } else {
      this.focusTrap.deactivate()
    }
  }

  static setScreenDiameter(this: void) {
    const screen = getWindowDimensions()
    const diameter = Math.sqrt(screen.height ** 2 + screen.width ** 2)
    document.documentElement.style.setProperty('--diameter', `${diameter}px`)
  }
}

if (document.querySelector(SELECTORS.nav)) {
  const nav = new Navigation()
  nav.bindEvents()
}
