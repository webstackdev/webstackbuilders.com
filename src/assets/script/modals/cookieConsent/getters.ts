/**
 * Getters for the cookie consent modal
 */
import { isAnchorElement, isButtonElement, isDivElement } from '../../utils/assertions/elements'
import { ClientScriptError } from '../../errors/ClientScriptError'

/** Gets the HTMLDivElement wrapping the cookie consent modal */
export const getCookieConsentWrapper = () => {
  const wrapper = document.getElementById(`cookie-modal-id`)
  if (!isDivElement(wrapper)) {
    throw new ClientScriptError(`Cookie consent modal wrapper with id 'cookie-modal-id' not found`)
  }
  return wrapper
}

/** Gets the close HTMLButtonElement */
export const getCookieConsentCloseBtn = () => {
  const closeBtn = document.querySelector(`.cookie-modal__close-btn`)
  if (!isButtonElement(closeBtn)) {
    throw new ClientScriptError(
      `Cookie consent close button with class 'cookie-modal__close-btn' not found`
    )
  }
  return closeBtn
}

/** Gets the HTMLButtonElement wrapping the cookie consent modal */
export const getCookieConsentAllowLink = () => {
  const allowLink = document.querySelector(`.cookie-modal__link-allow`)
  if (!isAnchorElement(allowLink)) {
    throw new ClientScriptError(
      `Cookie consent 'Allow All' link with class 'cookie-modal__link-allow' not found`
    )
  }
  return allowLink
}

/** Gets the HTMLButtonElement wrapping the cookie consent modal */
export const getCookieConsentAllowBtn = () => {
  const allowBtn = document.querySelector(`.cookie-modal__btn-allow`)
  if (!isButtonElement(allowBtn)) {
    throw new ClientScriptError(
      `Cookie consent close button with class 'cookie-modal__btn-allow' not found`
    )
  }
  return allowBtn
}