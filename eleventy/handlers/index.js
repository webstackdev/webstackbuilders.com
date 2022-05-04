/**
 * Filters to specify for use in .eleventy.js with `addFilter`
 */
const fs = require('fs')

const NOT_FOUND_PATH = 'public/404.html'

/**
 * Configuration for lazy images
 */
exports.lazyImagesHandler = {
  transformImgPath: imgPath => {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      // Handle remote file
      return imgPath
    } else {
      return `./src/images/${imgPath}`
    }
  },
}

/**
 * 404 error page routing for use by dev server, this can be removed in 11ty v2
 */
exports.pageNotFoundHandler = {
  callbacks: {
    ready: (err, bs) => {
      bs.addMiddleware('*', (req, res) => {
        if (!fs.existsSync(NOT_FOUND_PATH)) {
          throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one.`)
        }
        const content_404 = fs.readFileSync(NOT_FOUND_PATH)
        // Add 404 http status code in request header.
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
        // Provides the 404 content without redirect.
        res.write(content_404)
        res.end()
      })
    },
  },
}
