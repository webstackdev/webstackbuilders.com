







export const cookieModalHandler = () => {
  /* eslint-disable-next-line no-null/no-null */
  if (localStorage.getItem(`COOKIE_BANNER_VISIBLE`) === null) {
    localStorage.setItem(`COOKIE_BANNER_VISIBLE`, `false`)
  }
  const cookieConsentWrapper = getCookieConsentWrapper()
  const cookieConsentCloseBtn = getCookieConsentCloseBtn()

  cookieConsentWrapper.addEventListener(`click`, dismissClickEventHandler)
  cookieConsentCloseBtn.addEventListener(`keyup`, dismissOnEscEventHandler)
  cookieConsentCloseBtn.addEventListener(`touchend`, dismissOnTouchendEventHandler)
}

/*

cookieModalDismissBtn.style.display = `flex`

if (cookieButton) cookieButton.addEventListener(`click`, dismissCookieModal)

document.getElementById(`button`)?.addEventListener(`click`, handleClick)
*/
