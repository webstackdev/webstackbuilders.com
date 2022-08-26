/**
 * Images generated for social shares
 */
import type { TaskFunction } from 'gulp'
import { dest } from 'gulp'
import { log } from '../utils'
import run from 'gulp-run'
import { socialImagesBuildDir, socialImagesFormat } from '../paths'

const task: TaskFunction = () => {
  log(`Generating social share images`)
    // npx eleventy-social-images --outputDir public --dataFile social/pages.json --templatePath social/template.html
    /**
     * @TODO:
     * 1. validate incoming file paths. They should be to public/tmp/social
     * 2. figure out how _generate is getting built.
     * 3. Add last postbuild task to build to delete the public/tmp dir, and logic to
     *    leave it if in dev mode
     * 4. update templates to public/tmp dirs
     */
  return run('echo Hello World').exec()
    .pipe(gulp.dest('output'))
}

export default task
