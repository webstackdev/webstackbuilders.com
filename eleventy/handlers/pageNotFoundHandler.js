/**
 * 404 error page routing for use by dev server.
 */
const fs = require('fs')
const { resolve } = require('path')
const BrowserSync = require('browser-sync')
const { buildDir } = require('../../scripts/build/paths')

const path404 = resolve(buildDir, `404.html`)
exports.path404 = path404

const exists404 = () => {
  if (!fs.existsSync(path404))
    throw new Error(`Expected a "${path404}" file in the output directory but could not find one.`)
}
exports.exists404 = exists404

/**
 * @param {} _ - 
 * @param {} res - 
 */
const bsMiddlewareCallback = (_, res) => {
  exists404()
  const content404 = fs.readFileSync(path404)
  // Add 404 http status code in request header.
  res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
  // Provides the 404 content without redirect.
  res.write(content404)
  res.end()
}
exports.bsMiddlewareCallback = bsMiddlewareCallback

/**
 * @param {Error} _ - error object
 * @param {BrowserSync} bs - Eleventy's BrowserSync instance
 */
exports.pageNotFoundHandler = (_, bs) => {
  bs.addMiddleware('*', bsMiddlewareCallback)
}
