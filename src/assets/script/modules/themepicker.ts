interface MetaColorsWindow extends Window {
  /**
   * Object with theme id's as keys and backgroundOffset hex color as value.
   * This is set in initialTheme.njk from themes.json in _data directory.
   */
  metaColors: { [key: string]: string }
}

declare let window: MetaColorsWindow

let ACTIVE_THEME = 'default'
let IS_OPEN = false

const SELECTORS = {
  picker: '.js-themepicker', // entire theme picker drop down component
  themeSelectBtn: '.js-themepicker-themeselect', // button on each theme to select
  closeBtn: '.js-themepicker-close', // close button for the theme picker drop down
  navToggleBtn: '.js-nav-toggle', // hamburger menu on mobile
  toggleBtn: '.js-themepicker-toggle', // button to toggle the picker in navigation header
}

const CLASSES = {
  open: 'is-open',
  active: 'is-active',
}

const THEME_STORAGE_KEY = 'theme'
const HAS_LOCAL_STORAGE = typeof Storage !== 'undefined'

export const setupThemeSwitcher = () => {
  const systemPreference = getSystemPreference()
  const storedPreference = getStoredPreference()

  if (storedPreference) {
    ACTIVE_THEME = storedPreference
  } else if (systemPreference) {
    ACTIVE_THEME = systemPreference
  }

  setActiveItem()
  bindEvents()
}

const queryDocument = (selector: string): Element => {
  const element = document.querySelector(selector)
  /* eslint-disable-next-line no-null/no-null */
  if (element === null)
    throw new Error(`Could not find document element for query selector ${selector}`)
  return element
}

const queryAllDocument = (selector: string): NodeListOf<Element> => {
  const elements = document.querySelectorAll(selector)
  if (elements.length === 0)
    throw new Error(`Could not find any document elements for query selector ${selector}`)
  return elements
}

function isHtmlElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement
}

const bindEvents = () => {
  queryDocument(SELECTORS.toggleBtn).addEventListener('click', () => togglePicker())
  queryDocument(SELECTORS.closeBtn).addEventListener('click', () => togglePicker(false))
  queryDocument(SELECTORS.navToggleBtn).addEventListener('click', () => {
    if (IS_OPEN) togglePicker(false)
  })

  Array.from(queryAllDocument(SELECTORS.themeSelectBtn)).forEach(button => {
    if (!isHtmlElement(button)) return
    const themeId = button.dataset['theme']
    if (themeId) button.addEventListener('click', () => setTheme(themeId))
  })
}

const getSystemPreference = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return false
}

const getStoredPreference = () => {
  if (HAS_LOCAL_STORAGE) {
    return localStorage.getItem(THEME_STORAGE_KEY)
  }
  return false
}

const setActiveItem = () => {
  Array.from(queryAllDocument(SELECTORS.themeSelectBtn)).forEach(button => {
    const buttonParentNode = button.parentNode

    if (!isHtmlElement(button) || !isHtmlElement(buttonParentNode)) return

    button.removeAttribute('aria-checked')
    buttonParentNode.classList.remove(CLASSES.active)

    if (button.dataset['theme'] === ACTIVE_THEME) {
      button.setAttribute('aria-checked', 'true')
      buttonParentNode.classList.add(CLASSES.active)
    }
  })
}

const setTheme = (themeId: string) => {
  ACTIVE_THEME = themeId

  document.documentElement.setAttribute('data-theme', themeId)

  if (HAS_LOCAL_STORAGE) {
    localStorage.setItem(THEME_STORAGE_KEY, themeId)
  }

  const hasThemeColorMeta =
    !!document.querySelector('meta[name="theme-color"]') && window.metaColors

  if (hasThemeColorMeta) {
    const metaColor = window.metaColors[themeId]
    if (!metaColor) throw new Error('metaColor global not set on browser window object')
    const metaTag = queryDocument('meta[name="theme-color"]')
    metaTag.setAttribute('content', metaColor)
  }

  setActiveItem()
}

const togglePicker = (force?: boolean) => {
  IS_OPEN = typeof force === 'boolean' ? force : !IS_OPEN

  const toggleBtn = queryDocument(SELECTORS.toggleBtn)
  if (!isHtmlElement(toggleBtn)) throw new Error('toggleBtn is not an HTML Element')
  toggleBtn.setAttribute('aria-expanded', String(IS_OPEN))
  const picker = queryDocument(SELECTORS.picker)
  if (IS_OPEN) {
    picker.removeAttribute('hidden')
    const pickerOpen = () => picker.classList.add(CLASSES.open)
    window.setTimeout(pickerOpen, 1)

    const themeSelectBtn = queryAllDocument(SELECTORS.themeSelectBtn)[0]
    if (!isHtmlElement(themeSelectBtn)) throw new Error('themeSelectBtn is not an HTML Element')
    themeSelectBtn.focus()
  } else {
    const transitionHandler = () => {
      picker.removeEventListener('transitionend', transitionHandler)
      picker.setAttribute('hidden', 'true')
    }
    picker.addEventListener('transitionend', transitionHandler)
    picker.classList.remove(CLASSES.open)
    toggleBtn.focus()
  }
}
