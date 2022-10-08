/**
 *
 */

import { resolve } from 'path'
import { JSDOM } from 'jsdom'
import { loadHtmlTemplate } from './loadHtmlTemplate'
import { tsCompile } from './compileTs'

/**
 * Method to build an absolute path to a fixture when a test follows the convention
 * of being placed in a `__tests__` directory and has a fixture in a `__fixtures__`
 * directory at the same level as the test directory.
 *
 * @param fileName - The filename of a fixture to build a path for
 * @param dirName - The `__dirname` Node variable from the file that has a `__fixtures__` directory
 * @returns - Absolute path to the Eleventy template fixture
 */
export const getFixturePath = (fileName: string, dirName: string) => {
  return resolve(dirName, `../__fixtures__`, fileName)
}

/**
 * Method to add a compiled script string to a <script> element in a JSDOM instance
 *
 * @param scriptPath - Absolute path to the script file that should be compiled
 * @param document - JSDOM document object with an Eleventy template to add a script to
 */
export const addScript = async (scriptPath: string, document: Document) => {
  const script = await tsCompile(scriptPath)
  const scriptTag = document.createElement(`script`)
  scriptTag.innerHTML = script
  document.head.appendChild(scriptTag)
}

/**
 *
 * @param templatePath - Absolute path to the Eleventy template fixture
 * @param scriptPath - Absolute path to the script file that should be compiled
 * @returns JSDOM window object
 */
export const loadDomWithScript = async (templatePath: string, scriptPath: string) => {
  const json = await loadHtmlTemplate(templatePath)
  const html = json.content
  const dom = new JSDOM(html, { runScripts: `dangerously` })
  const { window } = dom
  await addScript(scriptPath, window[`document`])
  return dom
}
