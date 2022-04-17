const COOKIE_BANNER_DISPLAYED = 'cookieBannerDisplayed'

const dismiss = () => {
  const jsCookieBanner = document.querySelector('.js-cookie-banner')
  if (jsCookieBanner) jsCookieBanner.remove()
  localStorage.setItem(COOKIE_BANNER_DISPLAYED, 'true')
}

if (localStorage.getItem(COOKIE_BANNER_DISPLAYED)) {
  const jsCookieBanner = document.querySelector('.js-cookie-banner')
  if (jsCookieBanner) jsCookieBanner.remove()
} else {
  const cookieBannerId = document.getElementById('cookie-banner-id')
  if (cookieBannerId) cookieBannerId.style.display = 'block'
  const cookieButton = document.querySelector('.cookie-btn')
  if (cookieButton) cookieButton.addEventListener('click', dismiss)
}
