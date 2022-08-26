/**
 * Task to build the complete project for production
 */
import type { TaskFunction } from 'gulp'
import buildCss from './build:css'
import clean from './util:clean'
import { series } from 'gulp'
import setup from './util:setup'

// Eleventy also has build events https://www.11ty.dev/docs/events
// 'before', 'after', 'afterWatch' configured in .eleventy.js

const prebuild: TaskFunction = series(clean, setup)

// CSS must be built before HTML for the cachebuster plugin to work
const build: TaskFunction = series(buildCss)

const task: TaskFunction = series(prebuild, build)
export default task
