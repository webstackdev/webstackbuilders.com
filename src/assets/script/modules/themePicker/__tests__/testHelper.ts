/**
 * Eleventy global data is not available when rendering individual
 * templates, kept in sync by assertions against the selector variable.
 */
export const getThemePickerItemCard = (themeId: string) => {
  return`
<li class="themepicker__item">
  <button
    class="themepicker__selectBtn"
    aria-label="select color theme '${themeId.toUpperCase()}'"
    data-theme="${themeId}"
  >
    <span class="themepicker__name">${themeId.toUpperCase()}</span>
    <span class="themepicker__palette">
      <span class="themepicker__hue themepicker__hue--primary"></span>
      <span class="themepicker__hue themepicker__hue--secondary"></span>
      <span class="themepicker__hue themepicker__hue--border"></span>
      <span class="themepicker__hue themepicker__hue--textoffset"></span>
      <span class="themepicker__hue themepicker__hue--text"></span>
    </span>
  </button>
</li>
`
}
