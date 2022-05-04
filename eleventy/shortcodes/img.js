const Image = require('@11ty/eleventy-img')
const minify = require('./utils').minify

exports.imgShortcode = async (url, formats, widths, sizes = '', cls = '', alt = '') => {
  // formats must be an array
  formats = formats.split(',')

  // widths must be an array
  widths = widths.split(',')

  // if widths.length > 1, then we need a sizes string
  if (widths.length > 1 && sizes.length === 0) {
    widths = [widths[0]]
  }

  const metadata = await Image(url, {
    widths,
    formats,
    urlPath: '/images/',
    outputDir: './build/images/',
    useCache: false,
    sharpJpegOptions: {
      quality: 85,
    },
  })

  const imageAttributes = {
    sizes,
    class: cls,
    alt,
    loading: 'lazy',
  }

  return minify(Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline',
  }))
}
