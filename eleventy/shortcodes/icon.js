/**
 * Returns <svg> block for using SVG icon sprite by icon name
 *
 * @param _
 * @param iconName
 */
exports.icon = (_, iconName) => {
  const output = `
<svg class="icon icon--${iconName}" role="img" aria-hidden="true" width="24" height="24">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-${iconName}"></use>
</svg>
`
  return output
}
