/**
 * Async Image Handler utilities tests
 */
const { describe, expect, test } = require('@jest/globals')
const {
  checkForAltMetadata,
  filenameFormat,
  getRootPathsFromFilePath,
  isRelativeFilePath,
  renderTemplate,
  getDataSrcset,
  stripLeadingSlash,
  stripTrailingSlash,
} = require('../utils')
const { imageMetadataFixture } = require('../__fixtures__/imageMetadata')

describe(`Check for alt metadata for image`, () => {
  test('Passes with alt text', () => {
    expect(checkForAltMetadata('A cover image', 'cover.jpeg')).toBe(true)
  })

  test('Throw with empty string for alt text', () => {
    expect(() => checkForAltMetadata('', 'cover.jpeg')).toThrow()
  })
})

describe(`Check that slug is generated from generated image metadata`, () => {
  test('Returns slug with valid parameters', () => {
    const results = filenameFormat(undefined, 'images/cover.webp', 800, 'webp', undefined)
    expect(results).toBe('cover-800w.webp')
  })

  test('Updates returned slug with format when it differs from src', () => {
    const results = filenameFormat(undefined, 'images/cover.jpeg', 800, 'webp', undefined)
    expect(results).toBe('cover-800w.webp')
  })

  test('Returns slug with the size used to build the string', () => {
    const size = 800
    const results = filenameFormat(undefined, 'images/cover.webp', size, 'webp', undefined)
    expect(results).toContain(size.toString())
  })
})

describe(`Strip leading slash regex`, () => {
  test('Returns slash-leading string without slash', () => {
    const results = stripLeadingSlash(`/my/path`)
    expect(results).toBe(`my/path`)
  })

  test('Returns string that does not have a leading slash', () => {
    const results = stripLeadingSlash(`my/path`)
    expect(results).toBe(`my/path`)
  })
})

describe(`Strip trailing slash regex`, () => {
  test('Returns slash-trailing string without slash', () => {
    const results = stripTrailingSlash(`my/path/`)
    expect(results).toBe(`my/path`)
  })

  test('Returns string that does not have a trailing slash', () => {
    const results = stripTrailingSlash(`my/path`)
    expect(results).toBe(`my/path`)
  })
})

describe(`Strips the filename and extension from an absolute file path`, () => {
  test('Single path returned with trailing slash', () => {
    const results = getRootPathsFromFilePath(`/avatars/john-smith.jpeg`)
    expect(results).toBe(`avatars/`)
  })

  test('Multiple paths returned with trailing slash', () => {
    const results = getRootPathsFromFilePath(`/promo/test/cover.webp`)
    expect(results).toBe(`promo/test/`)
  })
})

describe(`Tests if the filename uses the relative file path handling strategy`, () => {
  test(`File name alone matches`, () => {
    const results = isRelativeFilePath(`cover.webp`)
    expect(results).toBeTruthy()
  })

  test(`File name with leading relative path matches`, () => {
    const results = isRelativeFilePath(`feature/great.jpeg`)
    expect(results).toBeTruthy()
  })

  test(`Fails on absolute path in filename`, () => {
    const results = isRelativeFilePath(`/great.jpeg`)
    expect(results).toBeFalsy()
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

  test('Non-lazy image matches snapshot with same context', () => {
    expect(renderTemplate(`picture.njk`, { lazy: false, ...context })).toMatchSnapshot()
  })

  const lazyContext = {
    base64Placeholder: `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`,
    ...context,
  }

  test('Lazy image matches snapshot with same context', () => {
    expect(renderTemplate(`picture.njk`, { lazy: true, ...lazyContext })).toMatchSnapshot()
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
