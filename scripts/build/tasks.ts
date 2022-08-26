import type { TaskFunction } from 'gulp'
/// <reference path="../../@types/npm-scripts-info.d.ts" />
/**
 * Get the npm-scripts-info from package.json to use in setting 'description' field
 *
 * @returns {object} e.g. { info: 'Display information about the scripts', test: 'Run the tests' }
 */
import getScriptsInfo from 'npm-scripts-info'
import gulp from 'gulp'
import { readdir } from 'fs/promises'

let _pkgScripts: { [key: string]: string }

/**
 * `read-pkg-up` is a Sindresorhus ESM-only package. This is the
 * only way to get Jest with TypeScript to load ES modules,
 * without setting 'type' to 'module' in 'package.json'.
 * Using a dynamic import directly gets over-written by TS.
 */
const dynamicImport = async (packageName: string) =>
  new Function(`return import('${packageName}')`)()

export const loadpkgScripts = async () => {
  if (_pkgScripts) return _pkgScripts
  const pkgJson = await dynamicImport('read-pkg-up')
  _pkgScripts = getScriptsInfo(pkgJson.pkg)
  return _pkgScripts
}

export const getTaskDescription = (taskName: string) => {
  return _pkgScripts[taskName]
}

/** Load `scripts-info` key from `package.json` to use in setting `description` field */
await loadpkgScripts()

/**
 * Generate parameters for Gulp task() method from a task template in the 'tasks' directory
 */
const addTask = async (taskName: string) => {
  const { task }: { task: TaskFunction } = await import('./build/gulp/tasks/' + taskName + '.ts')
  task.description = getTaskDescription(taskName)
  gulp.task(taskName, task)
}

/**
 *
 */
export const getTaskfiles = async () => {
  const taskFiles = await readdir('./build/gulp/tasks')
  return taskFiles.map(async taskFile => {
    if (!taskFile.match(/\.js$/i)) return
    await addTask(taskFile)
  })
}
