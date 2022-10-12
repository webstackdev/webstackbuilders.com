/**
 * Test helper methods to load JSDOM and add script to the DOM
 */
import { curry } from 'lodash'
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
export const getFixturePath = (dirName: string, fileName: string) => {
  return resolve(dirName, `../__fixtures__`, fileName)
}

/**
 * Get a `getFixturePath` function with the current directory curried
 *
 * @param dirName - The directory of the test file, use `__dirname`
 */
export const getCurriedFixturePath = (dirName: string) => curry(getFixturePath)(dirName)

/**
 * Convenience method to extract the document object from a JSDOM object
 */
export const getDocumentFromDom = (dom: JSDOM) => {
  const {
    window: { document },
  } = dom
  return document
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
 * Return a JSDOM object
 *
 * @param templatePath - Absolute path to the Eleventy template fixture
 * @returns JSDOM window object
 */
export const loadDom = async (templatePath: string) => {
  const json = await loadHtmlTemplate(templatePath)
  const html = json.content
  return new JSDOM(html, { runScripts: `dangerously` })
}

/**
 *
 * @param templatePath - Absolute path to the Eleventy template fixture
 * @param scriptPath - Absolute path to the script file that should be compiled
 * @returns JSDOM window object
 */
export const loadDomWithScript = async (templatePath: string, scriptPath: string) => {
  const dom = await loadDom(templatePath)
  const { window } = dom
  await addScript(scriptPath, window[`document`])
  return dom
}
