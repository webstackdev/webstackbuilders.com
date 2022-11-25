/**
 * Async Image Handler utilities tests
 */
const { describe, expect, test } = require('@jest/globals')
const fs = require('fs')
const { Volume } = require('memfs')

jest.mock('fs', () => {
  const fs = jest.requireActual('fs')
  const unionfs = require('unionfs').default
  unionfs.reset = () => {
    // fss is unionfs' list of overlays
    unionfs.fss = [fs]
  }
  return unionfs.use(fs)
})

// Require after the mock fs is configured
const { pathsExist } = require('../file')

// @TODO: Can't figure out how to mock the file system with Jest
describe(`Verifies path to image file points to a file and the output directory exists`, () => {
  const imagePath = '/var/www/eleventy/src/pages/articles/helloworld/cover.jpeg'
  const outputDir = '/var/www/eleventy/public/articles/helloworld'

  const vol = Volume.fromJSON(
    {
      'src/pages/articles/helloworld/cover.jpeg': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
    },
    '/var/www/eleventy'
  )

  afterEach(() => {
    //fs.reset()
  })

  test.skip('Returns true with a valid image path', () => {
    fs.use(vol)
    expect(pathsExist(imagePath, outputDir, 'cover.jpeg')).toBe(true)
  })

  test.skip('Throws on an invalid image path', () => {
    fs.use(vol)
    expect(() => pathsExist('not/a/real/file.jpg', outputDir, 'cover.jpeg')).toThrow()
  })

  test.skip('Creates the output directory if it does not exist', () => {
    fs.use(vol)
    pathsExist(imagePath, outputDir, 'cover.jpeg')
    expect(fs.accessSync(outputDir) === undefined).toBe(true)
  })
})
