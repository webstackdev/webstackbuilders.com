/**
 * This file is called from within a worker thread when a task is executed
 */
import * as workerPool from './pool'
import type { EleventyJson } from './pool'

const { getWorkerPool } = workerPool

export const tsCompile = async (entryFile: string) => {
  return (await getWorkerPool().getStaticPool().exec({
    helperType: 'tsCompile',
    inputPath: entryFile,
  })) as unknown as Promise<string>
}

export const loadHtmlTemplate = async (templatePath: string) => {
  return (await getWorkerPool().getStaticPool().exec({
    helperType: 'loadHtmlTemplate',
    inputPath: templatePath,
  })) as unknown as Promise<EleventyJson>
}

export const cleanup = async () => {
  await getWorkerPool().cleanup()
}
