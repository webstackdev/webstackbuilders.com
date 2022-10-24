/**
 * Cookie consent modal event listeners
 */
import * as getters from './getters'

/**
 * Close button and dismiss
 */

export const handleDismissCookieModal = () => {
  const wrapper = getters.getCookieConsentWrapper()
  wrapper.style.display = `none`
  localStorage.setItem(`COOKIE_BANNER_VISIBLE`, `false`)
}

/** Event handler to dismiss modal on close button click */
export const dismissClickEventHandler = (event: MouseEvent) => {
  if (event.type === 'click') handleDismissCookieModal()
}

/** Event handler to dismiss modal on esc keypress */
export const dismissOnEscEventHandler = (event: KeyboardEvent) => {
  if (event.key === `Escape`) handleDismissCookieModal()
}

/** Event handler to dismiss modal on close button touch end */
export const dismissOnTouchendEventHandler = (event: TouchEvent) => {
  if (event.type === `touchend`) handleDismissCookieModal()
}

/**
 * `Allow All` button event handlers
 */

export const handleAllowAllCookies = () => {
  //
}

/** Event handler for 'Allow All' on link click */
export const allowBtnClickEventHandler = (event: MouseEvent) => {
  if (event.type === `click`) handleAllowAllCookies()
}

/** Event handler for 'Allow All' on Enter keypress */
export const allowBtnEnterEventHandler = (event: KeyboardEvent) => {
  if (event.key === `Enter`) handleAllowAllCookies()
}

/** Event handler for 'Allow All' button touch end */
export const allowBtnEnterKeyupEventHandler = (event: TouchEvent) => {
  if (event.type === `touchend`) handleAllowAllCookies()
}

/**
 * `Allow All` link event handlers
 */

/** Event handler for 'Allow All' on link click */
export const allowLinkClickEventHandler = (event: MouseEvent) => {
  if (event.type === `click`) handleAllowAllCookies()
}

/** Event handler for 'Allow All' on Enter keypress */
export const allowLinkEnterEventHandler = (event: KeyboardEvent) => {
  if (event.key === `Enter`) handleAllowAllCookies()
}

/** Event handler for 'Allow All' link touch end */
export const allowLinkTouchendKeyupEventHandler = (event: TouchEvent) => {
  if (event.type === `touchend`) handleAllowAllCookies()
}
