//import { getTaskfiles } from './scripts/build/tasks'
import { task } from 'gulp'

/**
 * Build tasks
 */
import build from './scripts/build/tasks/build'
import buildCss from './scripts/build/tasks/build:css'
//import buildCssCritical from './scripts/build/tasks/build:css-critical'
import buildFonts from './scripts/build/tasks/build:fonts'
import buildHtml from './scripts/build/tasks/build:html'
import buildHtmlDebug from './scripts/build/tasks/build:html:debug'
import buildHtmlCompress from './scripts/build/tasks/build:html:compress'
import buildHtmlMinify from './scripts/build/tasks/build:html:minify'
import buildImages from './scripts/build/tasks/build:images'
import buildLambda from './scripts/build/tasks/build:lambda'
import buildScript from './scripts/build/tasks/build:script'
import buildServiceworker from './scripts/build/tasks/build:service-worker'
import buildSocialImages from './scripts/build/tasks/build:social-images'
import buildSocialStyles from './scripts/build/tasks/build:social-styles'
import buildSprites from './scripts/build/tasks/build:sprites'

task(`build`, build)
task(`build:css`, buildCss)
//task(`build:css-critical`, buildCssCritical)
task(`build:fonts`, buildFonts)
task(`build:html`, buildHtml)
task(`build:html:debug`, buildHtmlDebug)
task(`build:images`, buildImages)
task(`build:lambda`, buildLambda)
task(`build:html:compress`, buildHtmlCompress)
task(`build:html:minify`, buildHtmlMinify)
task(`build:script`, buildScript)
task(`build:service-worker`, buildServiceworker)
task(`build:social-images`, buildSocialImages)
task(`build:social-styles`, buildSocialStyles)
task(`build:sprites`, buildSprites)

/**
 * Formatting tasks
 */
import format from './scripts/build/tasks/format'
import formatJson from './scripts/build/tasks/format:json'
import formatSass from './scripts/build/tasks/format:sass'
import formatScript from './scripts/build/tasks/format:script'

task(`format`, format)
task(`format:json`, formatJson)
task(`format:sass`, formatSass)
task(`format:script`, formatScript)

/**
 * Linting tasks
 */
import lint from './scripts/build/tasks/lint'
import lintFrontmatter from './scripts/build/tasks/lint:frontmatter'
import lintSass from './scripts/build/tasks/lint:sass'
import lintScript from './scripts/build/tasks/lint:script'

task(`lint`, lint)
task(`lint:frontmatter`, lintFrontmatter)
task(`lint:sass`, lintSass)
task(`lint:script`, lintScript)

/**
 * Utility tasks
 */
import clean from './scripts/build/tasks/util:clean'
import release from './scripts/build/tasks/util:release'
import setup from './scripts/build/tasks/util:setup'
import stats from './scripts/build/tasks/util:stats'
import version from './scripts/build/tasks/util:version'

task(`util:clean`, clean)
task(`util:release`, release)
task(`util:setup`, setup)
task(`util:stats`, stats)
task(`util:version`, version)

/**
 * Watch tasks
 */
import watchLambda from './scripts/build/tasks/watch:lambda'

task(`watch:lambda`, watchLambda)
