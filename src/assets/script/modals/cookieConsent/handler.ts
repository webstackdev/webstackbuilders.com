/**
 * Add event handlers to cookie consent modal and initialize visible setting in local storage
 */
import * as getters from './getters'
import * as listeners from './listeners'

export const cookieModalHandler = () => {
  /* eslint-disable-next-line no-null/no-null */
  if (localStorage.getItem(`COOKIE_BANNER_VISIBLE`) === null) {
    localStorage.setItem(`COOKIE_BANNER_VISIBLE`, `false`)
  }
  const cookieConsentWrapper = getters.getCookieConsentWrapper()
  const cookieConsentCloseBtn = getters.getCookieConsentCloseBtn()

  cookieConsentWrapper.addEventListener(`click`, listeners.dismissClickEventHandler)
  cookieConsentCloseBtn.addEventListener(`keyup`, listeners.dismissOnEscEventHandler)
  cookieConsentCloseBtn.addEventListener(`touchend`, listeners.dismissOnTouchendEventHandler)
}

/*

cookieModalDismissBtn.style.display = `flex`

if (cookieButton) cookieButton.addEventListener(`click`, dismissCookieModal)

document.getElementById(`button`)?.addEventListener(`click`, handleClick)
*/
