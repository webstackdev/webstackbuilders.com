import build from './scripts/build/tasks/build'
import buildCss from './scripts/build/tasks/build:css'
import buildHtml from './scripts/build/tasks/build:html'
import buildSprites from './scripts/build/tasks/build:sprites'
import clean from './scripts/build/tasks/util:clean'
//import { getTaskfiles } from './scripts/build/tasks'
import gulp from 'gulp'
import lintScript from './scripts/build/tasks/lint:script'
import setup from './scripts/build/tasks/util:setup'

/**
 * Load all gulp tasks that are in ./build/gulp/tasks
 */
/*getTaskfiles().forEach(task => {
  task.description = `Create dirs`
  gulp.task(task)
})*/

gulp.task(`util:clean`, clean)
gulp.task(`util:setup`, setup)
gulp.task(`build`, build)
gulp.task(`build:css`, buildCss)
gulp.task(`build:html`, buildHtml)
gulp.task(`build:sprites`, buildSprites)
gulp.task(`lint:script`, lintScript)
