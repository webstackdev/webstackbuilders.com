/**
 * @NOTE: This needs to stay in sync with the front matter navigationOptions
 *   provided to src/_layouts/base.njk for the Eleventy Navigation plugin for
 *   nav menu CSS classes.
 */

const menuItems = `
<ul class="main-nav__menu">
  <li class="main-nav__item"><a href="/about/" class="main-nav__item-link">About</a></li>
  <li class="main-nav__item"><a href="/case-studies/" class="main-nav__item-link">Case Studies</a></li>
  <li class="main-nav__item"><a href="/services/" class="main-nav__item-link">Services</a></li>
  <li class="main-nav__item"><a href="/articles/" class="main-nav__item-link">Articles</a></li>
  <li class="main-nav__item"><a href="/contact/" class="main-nav__item-link">Contact</a></li>
</ul>
`

document.querySelector(`.main-nav__content`)!.innerHTML = menuItems
