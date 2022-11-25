import { JSDOM, ResourceLoader } from 'jsdom'
import { version } from '../../../package.json'
import { getVirtualConsole } from './virtualConsole'
import { devServer } from '../jest.config.jsdom'

export interface EnvOptions {
  html?: string
  userAgent?: string
  [option: string]: unknown
}

export const EnvOptionDefaults: EnvOptions = {
  html: `<!DOCTYPE html>`,
  userAgent: `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${version}`,
}

export const getJsdomInstance = (virtConsole?: Console, options: EnvOptions = EnvOptionDefaults) => {
  const mergedOptions = { ...EnvOptionDefaults, ...options }

  const resources = mergedOptions['userAgent']
    ? new ResourceLoader({
        userAgent: mergedOptions['userAgent'],
      })
    : undefined

  return new JSDOM(mergedOptions['html'], {
    pretendToBeVisual: true,
    resources,
    runScripts: 'dangerously',
    url: devServer,
    virtualConsole: getVirtualConsole(virtConsole ?? console),
    ...mergedOptions,
  })
}
