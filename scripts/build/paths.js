/**
 * File paths used in Gulp tasks and shortcodes
 */

const buildDir = `public`
exports.buildDir = buildDir

/**
 * Content source directories
 */
const contentSourceDir = `src/pages`
exports.contentSourceDir = contentSourceDir

const articlesSourceDir = `${contentSourceDir}/articles`
exports.articlesSourceDir = articlesSourceDir

const casestudiesSourceDir = `${contentSourceDir}/case-studies`
exports.casestudiesSourceDir = casestudiesSourceDir

const servicesSourceDir = `${contentSourceDir}/services`
exports.servicesSourceDir = servicesSourceDir

/**
 * Asset source directories
 */
const assetSourceDir = `src/assets`
exports.assetSourceDir = assetSourceDir

const jsSourceDir = `${assetSourceDir}/script`
exports.jsSourceDir = jsSourceDir

const scssSourceDir = `${assetSourceDir}/scss`
exports.scssSourceDir = scssSourceDir

const scssWatchGlob = `${scssSourceDir}/**/*`
exports.scssWatchGlob = scssWatchGlob

/**
 * Constants for build target directories
 */
const jsBuildDir = `${buildDir}/js`
exports.jsBuildDir = jsBuildDir

const cssBuildDir = `${buildDir}/css`
exports.cssBuildDir = cssBuildDir

/**
 * Source and build target files for SCSS compilation of site's main style sheets
 */
const scssSource = `${scssSourceDir}/index.scss`
exports.scssSource = scssSource

const cssTargetFilename = `index.css`
exports.cssTargetFilename = cssTargetFilename

/**
 * Social share image files and styling source and build targets
 */
const socialScssSourceDir = `${scssSourceDir}/social.scss`
exports.socialScssSourceDir = socialScssSourceDir

const socialCssBuildDir = `social`
exports.socialCssBuildDir = socialCssBuildDir

const socialImagesBuildDir = `previews`
exports.socialImagesBuildDir = socialImagesBuildDir

const socialImagesFormat = `png`
exports.socialImagesFormat = socialImagesFormat

/**
 * Source and build target directory for sprite generation from SVG files
 */
const spritesSourceDir = `${assetSourceDir}/icons`
exports.spritesSourceDir = spritesSourceDir

const spritesTargetDir = `src/_layouts/images`
exports.spritesTargetDir = spritesTargetDir

/**
 * Array of blobs that should be fed to Gulp src for dirs that should be linted
 */
const scriptLintSourceGlobs = [
  `@types/**/*.{js,ts}`,
  `eleventy/**/*.{js,ts}`,
  `lambda/**/*.{js,ts}`,
  `scripts/**/*.{js,ts}`,
  `src/**/*.{js,ts}`,
  `!node_modules/**`,
]
exports.scriptLintSourceGlobs = scriptLintSourceGlobs

/**
 * Build target file for Sitemap for use in permalink in nunjucks template frontmatter
 */
const sitemapBuildFilename = `/sitemap.xml` // plugin does not take path to build directory
exports.sitemapBuildFilename = sitemapBuildFilename

/**
 * Build target file for RSS feed file for use in permalink in nunjucks template frontmatter
 */
const rssFeedBuildFilename = `feed/feed.xml` // plugin does not take path to build directory
exports.rssFeedBuildFilename = rssFeedBuildFilename

/**
 * Source SVG file to use for generating favicon files
 */
const faviconSvgSourceFilename = `${assetSourceDir}/site/favicon.svg`
exports.faviconSvgSourceFilename = faviconSvgSourceFilename

const faviconSvgTargetDir = `${buildDir}/favicons`
exports.faviconSvgTargetDir = faviconSvgTargetDir

/**
 * The build paths that will be removed by the `util:clean` task before starting a new build
 */
const buildPathsToClean = [buildDir, socialCssBuildDir]
exports.buildPathsToClean = buildPathsToClean

/**
 * The build paths that should be present on a new build
 */
const buildPathsToCreate = [cssBuildDir, jsBuildDir]
exports.buildPathsToCreate = buildPathsToCreate
