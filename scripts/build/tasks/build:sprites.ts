/**
 * Build an svg sprite image based on the svg image files in
 * src/assets/icons and save it as public/images/site/icons.sprite.svg
 */
import { log } from '../utils'
import { spritesSourceDir, spritesBuildDir } from '../paths'
import lazypipe from 'lazypipe'
import { dest, src } from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import type { TaskFunction } from 'gulp'
import type { Config } from 'svg-sprite'

const spriterConfig: Config = {
  log: 'info',
  mode: {
    inline: true,
    /** Create a sprite svg image that uses <symbol> tags for each individual icon */
    symbol: {
      sprite: '../sprites.njk',
    },
  },
  shape: {
    id: {
      /** SVG shape ID generator callback */
      generator: 'icon-%s',
    },
    /** Path to YAML file with meta / accessibility data */
    meta: `${spritesBuildDir}/sprites.meta.yaml`,
    /** List of transformations / optimizations */
    transform: ['svgo'],
  },
  svg: {
    doctypeDeclaration: false,
    xmlDeclaration: false,
  },
}

/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
export const buildSpritesTask = lazypipe()
  .pipe(() => svgSprite(spriterConfig))

const task: TaskFunction = () => {
  log(`Building SVG sprites`)
  return src('**/*.svg', { cwd: spritesSourceDir })
    .pipe(svgSprite(spriterConfig))
    .pipe(dest(spritesBuildDir))
    .on('finish', () => log(`Sprites compiled to ${spritesBuildDir}`))
}

export default task
