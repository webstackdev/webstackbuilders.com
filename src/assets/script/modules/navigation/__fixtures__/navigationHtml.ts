/** Output from src/_layouts_components/navigation.njk */

export const navHtml = `
<nav class="main-nav" role="navigation">
  <div class="main-nav__content">
    <ul class="main-nav__menu">
      <li class="main-nav__item"><a class="main-nav__item-link" href="/about/">About</a></li>
      <li class="main-nav__item"><a class="main-nav__item-link" href="/case-studies/">Case Studies</a></li>
      <li class="main-nav__item"><a class="main-nav__item-link" href="/services/">Services</a></li>
      <li class="main-nav__item"><a class="main-nav__item-link" href="/articles/">Articles</a></li>
      <li class="main-nav__item"><a class="main-nav__item-link" href="/contact/">Contact</a></li>
    </ul>
  </div>
  <button
    aria-controls="nav-menu"
    aria-expanded="false"
    aria-label="toggle menu"
    class="icon-btn main-nav__toggleBtn"
  >
    <span class="main-nav__menu-icon">
      <span class="main-nav__menuicon-bar" />
      <span class="main-nav__menuicon-bar" />
      <span class="main-nav__menuicon-bar" />
      <span class="main-nav__menuicon-bar" />
    </span>
  </button>
  <div class="main-nav__bg">
    <div class="main-nav__bg-circle" />
  </div>
</nav>
`