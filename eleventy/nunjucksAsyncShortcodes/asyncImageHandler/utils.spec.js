/**
 * Async Image Handler utilities tests
 */
const fs = require('fs')
const mockCwd = require('mock-cwd').mockCwd
const mockFs = require('mock-fs')
const {
  checkForAltMetadata,
  filenameFormat,
  getImagePaths,
  pathsExist,
  renderTemplate,
  getDataSrcset,
} = require('./utils')
const { imageMetadataFixture } = require('./__fixtures__/imageMetadata')

describe(`Check for alt metadata for image`, () => {
  test('Passes with alt text', () => {
    expect(checkForAltMetadata('cover.jpeg', 'A cover image')).toBe(true)
  })

  test('Throw with empty string for alt text', () => {
    expect(() => checkForAltMetadata('cover.jpeg', '')).toThrow()
  })
})

describe(`Check that slug is generated from generated image metadata`, () => {
  test('Returns slug with valid parameters', () => {
    const results = filenameFormat(null, 'images/cover.webp', 800, 'webp', null)
    expect(results).toBe('cover-800w.webp')
  })

  test('Updates returned slug with format when it differs from src', () => {
    const results = filenameFormat(null, 'images/cover.jpeg', 800, 'webp', null)
    expect(results).toBe('cover-800w.webp')
  })

  test('Returns slug with the size used to build the string', () => {
    const size = 800
    const results = filenameFormat(null, 'images/cover.webp', size, 'webp', null)
    expect(results).toContain(size.toString())
  })
})

describe(`Returns paths for the source image file, output directory, and <img> tag src string`, () => {
  let mock
  beforeEach(() => {
    mock = mockCwd('/var/www/eleventy')
  })

  afterEach(() => {
    mock.restore()
  })

  test('Paths for absolute image filenames that are located side-by-side in Markdown file directories', () => {
    const paths = getImagePaths('/avatars/john-smith.jpeg', 'articles/helloworld')
    expect(paths).toMatchInlineSnapshot(`
      Object {
        "imagePath": "/var/www/eleventy/src/assets/images/avatars/john-smith.jpeg",
        "outputDir": "/var/www/eleventy/public/images/avatars",
        "urlPath": "images/avatars/john-smith.jpeg",
      }
    `) // urlPath: 'images'
  })

  test('Paths for relative image filenames that are in the assets/images folder', () => {
    const paths = getImagePaths('cover.jpeg', 'articles/helloworld')
    expect(paths).toMatchInlineSnapshot(`
      Object {
        "imagePath": "/var/www/eleventy/src/pages/articles/helloworld/cover.jpeg",
        "outputDir": "/var/www/eleventy/public/articles/helloworld",
        "urlPath": "articles/helloworld/",
      }
    `)
  })
})

describe(`Verifies path to image file points to a file and the output directory exists`, () => {
  afterEach(() => {
    mockFs.restore()
  })

  test('Returns true with a valid image path', () => {
    const imagePath = '/var/www/eleventy/src/pages/articles/helloworld/cover.jpeg'
    const outputDir = '/var/www/eleventy/public/articles/helloworld'
    mockFs({
      [imagePath]: Buffer.from([8, 6, 7, 5, 3, 0, 9]),
      [outputDir]: {
        /** empty directory */
      },
    })
    expect(pathsExist(imagePath, outputDir, 'cover.jpeg')).toBe(true)
  })

  test('Throws on an invalid image path', () => {
    const imagePath = '/var/www/eleventy/src/pages/articles/helloworld/cover.jpeg'
    const outputDir = '/var/www/eleventy/public/articles/helloworld'
    mockFs({
      [outputDir]: {
        /** empty directory */
      },
    })
    expect(() => pathsExist(imagePath, outputDir, 'cover.jpeg')).toThrow()
  })

  test('Creates the output directory if it does not exist', () => {
    const imagePath = '/var/www/eleventy/src/pages/articles/helloworld/cover.jpeg'
    const outputDir = '/var/www/eleventy/public/articles/helloworld'
    mockFs({
      [imagePath]: Buffer.from([8, 6, 7, 5, 3, 0, 9]),
    })
    pathsExist(imagePath, outputDir, 'cover.jpeg')
    expect(fs.accessSync(outputDir) === undefined).toBe(true)
  })
})

describe(`Renders the Nunjucks template without error`, () => {
  const context = {
    alt: 'A cover photo',
    className: '',
    ImageWidths: [400, 800, 1280],
    items: Object.values(imageMetadataFixture),
    sizes: '100vw',
    lowSrc: imageMetadataFixture['jpeg'][0],
    highSrc: imageMetadataFixture['jpeg'][imageMetadataFixture['jpeg'].length - 1],
  }

  test('Lazy image matches snapshot with same context', () => {
    expect(renderTemplate(`picture.njk`, { lazy: true, ...context })).toMatchSnapshot()
  })

  test('Non-lazy image matches snapshot with same context', () => {
    expect(renderTemplate(`picture.njk`, { lazy: false, ...context })).toMatchSnapshot()
  })
})

describe(`Returns a string with srcset for script to swap in`, () => {
  test('Matches snapshot with same items', () => {
    const formatItems = Object.values(imageMetadataFixture)[0]
    expect(getDataSrcset(formatItems)).toMatchInlineSnapshot(
      `"/img/6dfd7ac6-300.jpeg 300w, /img/6dfd7ac6-600.jpeg 600w, /img/6dfd7ac6-2406.jpeg 2406w"`
    )
  })
})
