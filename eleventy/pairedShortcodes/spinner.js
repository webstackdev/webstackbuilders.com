const outdent = require('outdent')

exports.spinner = _ => {
  const layer = index => `
<div class="spinner__layer spinner__layer--${index}">
  <div class="spinner__circle-clipper spinner__left">
    <div class="spinner__circle"></div>
  </div>
  <div class="spinner__gap-patch">
    <div class="spinner__circle"></div>
  </div>
  <div class="spinner__circle-clipper spinner__right">
    <div class="spinner__circle"></div>
  </div>
</div>
`

  const layers = []
  for (let i = 1; i <= 4; i++) {
    layers.push(layer(i))
  }
  const output = `
<div class="spinner">
  <div class="spinner__layercontainer">${layers.join('')}</div>
</div>
`

  return outdent.string(output)
}
