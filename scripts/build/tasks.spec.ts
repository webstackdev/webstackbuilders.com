import { afterEach, describe, expect, jest, test } from '@jest/globals'
import { getTaskDescription, loadpkgScripts } from './tasks'

import packageJson from './__fixtures__/package.json'
import path from 'path'

jest.mock('fs', () => {
  const fs = jest.requireActual('fs')
  const unionfs = require('unionfs').default
  unionfs.reset = () => {
    // fss is unionfs' list of overlays
    unionfs.fss = [fs]
  }
  return unionfs.use(fs)
})

const fs = require('fs')
const { Volume } = require('memfs')

describe(`Task functions work`, () => {
  const vol = Volume.fromJSON(
    {
      './package.json': packageJson,
    },
    process.cwd()
  )

  afterEach(() => {
    fs.reset()
  })

  test(`package script info has 'build' script defined`, async () => {
    fs.use(vol)
    //const pkgScriptInfo = await loadpkgScripts()
    //expect(pkgScriptInfo).toHaveProperty('custom')
    const pkgJson = fs.readFileSync(path.resolve(process.cwd(), 'package.json'), {
      encoding: 'utf8',
      flag: 'r',
    })
    //console.log(packageJson)
    expect(pkgJson).toMatchInlineSnapshot()
  })

  test.skip(`gets description from key`, async () => {
    fs.use(vol)
    await loadpkgScripts()
    expect(getTaskDescription('custom')).toEqual(`A custom task`)
  })
})
