const cssnano = require('cssnano')
const del = require('del')
const gulp = require('gulp')
const log = require('fancy-log')
const mkdirp = require('mkdirp')
const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const svgo = require('postcss-svgo')

/**
 * Delete generated directories before builds
 */
gulp.task('clean', async () => {
  await del([ 'public', 'social' ])
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
  gulp.src('src/assets/scss/index.scss')
    .pipe(sourcemaps.init())
    // synchronous mode w/Dart SASS is 2x as fast as async since Node removed fibers in v16
    .pipe(sass.sync().on('error', logError))
    // add vendor prefixing and focused optimizations
    .pipe(postcss([svgo(), postcssPresetEnv(), cssnano()]))
    // source maps by default are written inline in the compiled CSS files if no path as param
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'))
    .on('end', done)
})

gulp.task('watch:css', gulp.series('build:css', done => {
  gulp.watch('src/assets/scss/**/*', gulp.parallel('build:css'))
  done()
}))

/**
 * Build the CSS bundle used to style social share images
 */
gulp.task('postbuild:social-styles', done => {
  gulp.src('src/assets/scss/social.scss')
    .pipe(sourcemaps.init())
    // synchronous mode w/Dart SASS is 2x as fast as async since Node removed fibers in v16
    .pipe(sass.sync().on('error', logError))
    // add vendor prefixing and focused optimizations
    .pipe(postcss([svgo(), postcssPresetEnv(), cssnano()]))
    // source maps by default are written inline in the compiled CSS files if no path as param
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('social'))
    .on('end', done)
})

const logError = err => {
  log.error(err.message)
}
