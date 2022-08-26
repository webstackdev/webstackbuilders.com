/**
 * Build an svg sprite image based on the svg image files in
 * src/assets/icons and save it as public/images/site/icons.sprite.svg
 */
import { log } from '../utils'
import { spritesSourceDir, spritesTargetDir } from '../paths'
import lazypipe from 'lazypipe'
import { dest, src } from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import type { TaskFunction } from 'gulp'

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
    meta: `${spritesTargetDir}/sprites.meta.yaml`,
    transform: [svgSprite],
  },
  svg: {
    doctypeDeclaration: false,
    xmlDeclaration: false,
  },
}

export const buildSpritesTask = lazypipe()
  .pipe(() => svgSprite(spriterConfig))

const task: TaskFunction = () => {
  log(`Building SVG sprites`)
  return src('**/*.svg', { cwd: spritesSourceDir })
    .pipe(svgSprite(spriterConfig))
    .pipe(dest(spritesTargetDir))
    .on('finish', () => log(`Sprites compiled to ${spritesTargetDir}`))
}

export default task
