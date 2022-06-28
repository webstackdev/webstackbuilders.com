/** Built-in dependencies */
const path = require('path')
/** Third party dependencies */
const cssnano = require('cssnano')
const del = require('del')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const log = require('fancy-log')
const mkdirp = require('mkdirp')
const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const svgSprite = require('gulp-svg-sprite')
const svgo = require('postcss-svgo')
const { generateSW } = require('workbox-build')

const isDevelopment = process.env.ELEVENTY_ENV === 'development'

/**
 * Delete generated directories before builds
 */
gulp.task('clean', async () => {
  await del(['public', 'social'])
})

/**
 * Make sure js and css directories exist in the output folder
 */
gulp.task('setup', async () => {
  const dirs = ['public/js', 'public/css']
  await dirs.forEach(async dir => await mkdirp(dir))
})

/**
 * Build the site's main production CSS bundle
 */
gulp.task('build:css', done => {
  gulp
    .src('src/assets/scss/index.scss')
    .pipe(sourcemaps.init())
    // synchronous mode w/Dart SASS is 2x as fast as async since Node removed fibers in v16
    .pipe(sass.sync().on('error', logError))
    // add vendor prefixing and focused optimizations
    .pipe(postcss([svgo(), postcssPresetEnv(), cssnano()]))
    // source maps by default are written inline in the compiled CSS files if no path as param
    .pipe(gulpif(isDevelopment, sourcemaps.write('.')))
    .pipe(gulp.dest('public/css'))
    .on('end', done)
})

gulp.task(
  'watch:css',
  gulp.series('build:css', done => {
    gulp.watch('src/assets/scss/**/*', gulp.parallel('build:css'))
    done()
  })
)

/**
 * Build the CSS bundle used to style social share images
 */
gulp.task('postbuild:social-styles', done => {
  gulp
    .src('src/assets/scss/social.scss')
    .pipe(sourcemaps.init())
    // synchronous mode w/Dart SASS is 2x as fast as async since Node removed fibers in v16
    .pipe(sass.sync().on('error', logError))
    // add vendor prefixing and focused optimizations
    .pipe(postcss([svgo(), postcssPresetEnv(), cssnano()]))
    // source maps by default are written inline in the compiled CSS files if no path as param
    .pipe(gulpif(isDevelopment, sourcemaps.write('.')))
    .pipe(gulp.dest('social'))
    .on('end', done)
})

const logError = err => {
  log.error(err.message)
}

/**
 * Use Google Workbox to generate a service worker for the site. This
 * could be done as a Webpack plugin, but is done here instead to simplify
 * coordination. This must run as a last step in the build process so
 * that all assets are ready to be added to the list of assets to precache.
 *
 * @TODO: Add push notifications with PushManager.subscribe()
 *        https://developer.mozilla.org/en-US/docs/Web/API/Push_API
 * @TODO: Refactor to use streaming service worker, see README.md
 * @TODO: This currently precaches *everything*
 */
gulp.task('build:serviceworker', () => {
  return generateSW({
    // caching strategy to use
    runtimeCaching: [
      {
        urlPattern: /\.(?:html|css|js)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'webstackbuilders-cache',
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'webstackbuilders-cache',
        },
      },
    ],
    // local directory relative to the current directory to match globPatterns against
    globDirectory: './public/',
    // track and cache all files that match this glob pattern
    // prettier-ignore
    globPatterns: ['**\/*.{js,html,css,png,jpg,gif}'],
    // name of the service worker file created, must be in root directory to cover entire site
    swDest: path.join('./public/', 'sw.js'),
  }).then(({ count, size, warnings }) => {
    if (warnings.length > 0) {
      log.error('Warnings encountered while generating a service worker:' + warnings.join('\n'))
    }

    log(`Generated a service worker, which will precache ${count} files, totaling ${size} bytes.`)
  })
})

/**
 * Build an svg sprite image based on the svg image files in
 * src/assets/icons and save it as public/images/site/icons.sprite.svg
 */
gulp.task('build:sprites', done => {
  const spriterConfig = {
    log: 'info',
    mode: {
      inline: true,
      // Create a sprite svg image that uses <symbol> tags for each individual icon
      symbol: {
        sprite: '../sprites.njk',
      },
    },
    shape: {
      id: {
        generator: 'icon-%s', // Separator for directory name traversal
      },
      meta: 'src/_layouts/images/sprites.meta.yaml',
      transform: ['svgo'],
    },
    svg: {
      doctypeDeclaration: false,
      xmlDeclaration: false,
    },
  }

  gulp
    .src('**/*.svg', { cwd: 'src/assets/icons' }) //
    .pipe(svgSprite(spriterConfig))
    .pipe(gulp.dest('src/_layouts/images'))
    .on('finish', function () {
      log('Sprites compiled to _layouts/images/sprites.njk')
    })
    .on('end', done)
})
