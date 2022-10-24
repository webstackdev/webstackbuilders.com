/// <reference path="../../../@types/@11ty/eleventy.d.ts" />
import { statSync } from 'fs'
import Eleventy from '@11ty/eleventy'
import { checkFakedTimerStatus, ensureRealTimers, restoreTimers } from '../environment'

export interface EleventyJson {
  content: string
  inputPath: string
  outputPath: string
  url: string
}

/**
 * Convenience method to load an individual HTML template using Eleventy, respecting
 * the data cascade and includes.
 *
 * @param templatePath - Absolute path to the Eleventy template fixture
 * @returns JSDOM window object
 * @throws {Error} - throws Error if file doesn't exist
 */
export const loadHtmlTemplate = async (templatePath: string) => {
  statSync(templatePath)

  const fakedTimerStatus = checkFakedTimerStatus()
  ensureRealTimers(fakedTimerStatus)

  const templateOutput = new Eleventy(templatePath, '/tmp', { quietMode: true })
  const jsonArray = (await templateOutput.toJSON()) as unknown as EleventyJson[]
  if (!jsonArray || jsonArray.length === 0 || jsonArray[0] === undefined) {
    throw new Error(`Eleventy had no output for template file ${templatePath}`)
  }

  restoreTimers(fakedTimerStatus)

  return jsonArray[0]
}
