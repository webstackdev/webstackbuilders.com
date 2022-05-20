/** Built-in dependencies */
const fs = require('fs')
const path = require('path')
const util = require('util')
/** Third party dependencies */
const cssnano = require('cssnano')
const del = require('del')
const File = require('vinyl')
const glob = require('glob')
const gulp = require('gulp')
const log = require('fancy-log')
const mkdirp = require('mkdirp')
const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const svgo = require('postcss-svgo')
const SVGSpriter = require('svg-sprite')
const swPrecache = require('sw-precache')

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

/**
 * Use Google's service worker generator to create an up to date service worker.
 * Precaches every image, HTML, JavaScript, and CSS file.
 */
gulp.task('build:serviceworker', callback => {
  swPrecache.write(path.join('/', 'sw.js'), {
    staticFileGlobs: [
      // track and cache all files that match this pattern
      rootDir + '/**/*.{js,html,css,png,jpg,gif}',
    ],
    stripPrefix: rootDir
  }, callback);
})

/**
 * @TODO: Need to add this as a package.json script task, and build the sprite
 * sheet on demand. Should also inject the sprite markup into the head of every document.
 */
const spritesPermalink = '/assets/icons/icons.sprite.svg'
const spritesConfig = {
  mode: {
    inline: true,
    symbol: {
      sprite: 'icons.sprite.svg',
      example: false
    }
  },
  shape: {
    transform: ['svgo'],
    id: {
      generator: 'icon-%s'
    }
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false
  }
}

const compileSprites = async () => {
  const dir = path.resolve('src/assets/icons')
  // Make a new SVGSpriter instance w/ configuration
  const spriter = new SVGSpriter(spritesConfig)

  // Wrap spriter compile function in a Promise
  const compileSprite = async (args) => {
    return new Promise((resolve, reject) => {
      spriter.compile(args, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result.symbol.sprite)
      })
    })
  }

  // Get all SVG icon files in working directory
  const getFiles = util.promisify(glob)
  const files = await getFiles('**/*.svg', { cwd: dir })

  // Add them all to the spriter
  files.forEach(function (file) {
    const filePath = path.join(dir, file)
    spriter.add(
      new File({
        path: filePath,
        base: dir,
        contents: fs.readFileSync(filePath)
      })
    )
  })

  // Compile the sprite file and return it as a string
  const sprite = await compileSprite(config.mode)
  const spriteContent = sprite.contents.toString('utf8')
  return spriteContent
}
