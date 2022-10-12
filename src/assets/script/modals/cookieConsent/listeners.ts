/**
 * Cookie consent modal event listeners
 */
import { getters } from './getters'

/**
 * Close button and dismiss
 */

const handleDismissCookieModal = () => {
  const wrapper = getters.getCookieConsentWrapper()
  wrapper.style.display = `none`
  localStorage.setItem(`COOKIE_BANNER_VISIBLE`, `false`)
}

/** Event handler to dismiss modal on close button click */
const dismissClickEventHandler = (event: MouseEvent) => {
  if (event.type === 'click') handleDismissCookieModal()
}

/** Event handler to dismiss modal on esc keypress */
const dismissOnEscEventHandler = (event: KeyboardEvent) => {
  if (event.key === `Escape`) handleDismissCookieModal()
}

/** Event handler to dismiss modal on close button touch end */
const dismissOnTouchendEventHandler = (event: TouchEvent) => {
  if (event.type === `touchend`) handleDismissCookieModal()
}

/**
 * `Allow All` button event handlers
 */

const handleAllowAllCookies = () => {
  //
}

/** Event handler for 'Allow All' on link click */
const allowBtnClickEventHandler = (event: MouseEvent) => {
  if (event.type === `click`) handleAllowAllCookies()
}

/** Event handler for 'Allow All' on Enter keypress */
const allowBtnEnterEventHandler = (event: KeyboardEvent) => {
  if (event.key === `Enter`) handleAllowAllCookies()
}

/** Event handler for 'Allow All' button touch end */
const allowBtnEnterKeyupEventHandler = (event: TouchEvent) => {
  if (event.type === `touchend`) handleAllowAllCookies()
}

/**
 * `Allow All` link event handlers
 */

/** Event handler for 'Allow All' on link click */
const allowLinkClickEventHandler = (event: MouseEvent) => {
  if (event.type === `click`) handleAllowAllCookies()
}

/** Event handler for 'Allow All' on Enter keypress */
const allowLinkEnterEventHandler = (event: KeyboardEvent) => {
  if (event.key === `Enter`) handleAllowAllCookies()
}

/** Event handler for 'Allow All' link touch end */
const allowLinkTouchendKeyupEventHandler = (event: TouchEvent) => {
  if (event.type === `touchend`) handleAllowAllCookies()
}

/**
 * Exports
 */

export const listeners = {
  dismissClickEventHandler,
  dismissOnEscEventHandler,
  dismissOnTouchendEventHandler,
  allowBtnClickEventHandler,
  allowBtnEnterEventHandler,
  allowBtnEnterKeyupEventHandler,
  allowLinkClickEventHandler,
  allowLinkEnterEventHandler,
  allowLinkTouchendKeyupEventHandler,
}
