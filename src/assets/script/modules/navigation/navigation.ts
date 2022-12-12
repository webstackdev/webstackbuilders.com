import { createFocusTrap } from 'focus-trap'
import debounce from 'lodash/debounce'
import type { FocusTrap } from 'focus-trap'
import type { ScriptInit } from '../../@types/general'
import { getNavElement, getNavMenuElement, getNavMenuToggleBtnElement } from './selectors'
import { getWindowDimensions } from '../../utils/window'

const SELECTORS = {
  nav: '.main-nav',
  menu: '.main-nav__menu',
  toggleBtn: '.main-nav__toggleBtn',
}

const CLASSES = {
  noScroll: 'no-scroll',
  navOpen: 'main-nav--open',
  navMenuVisible: 'main-nav__menu--visible',
}

export const setScreenDiameter = () => {
  const windowComputed = getWindowDimensions()
  const diameter = Math.sqrt(windowComputed.height ** 2 + windowComputed.width ** 2)
  document.documentElement.style.setProperty('--diameter', `${diameter}px`)
}

export class Navigation {
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
    window.addEventListener('resize', debounce(setScreenDiameter, 200))
    setScreenDiameter()
  }

  toggleMenu(force?: boolean) {
    this.isOpen = force !== undefined ? force : !this.isOpen
    // <body class="no-scroll">
    document.body.classList.toggle(CLASSES.noScroll, this.isOpen)
    // <nav class="main-nav main-nav--open" role="navigation">
    this.nav.classList.toggle(CLASSES.navOpen, this.isOpen)
    // <button aria-controls="nav-menu" aria-expanded="true" aria-label="toggle menu" class="icon-btn main-nav__toggleBtn">
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
}

export const setupNavigation: ScriptInit = () => {
  if (document.querySelector(SELECTORS.nav)) {
    const nav = new Navigation()
    nav.bindEvents()
  }
}
