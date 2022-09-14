/**
 * Async Image Handler utilities tests
 */
const fs = require('fs')
const mockCwd = require('mock-cwd').mockCwd
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

const {
  checkForAltMetadata,
  filenameFormat,
  getImagePaths,
  getOptimizedFileName,
  getRootPathsFromFilePath,
  isRelativeFilePath,
  pathsExist,
  renderTemplate,
  getDataSrcset,
  stripLeadingSlash,
  stripTrailingSlash,
} = require('./utils')
const { imageMetadataFixture } = require('./__fixtures__/imageMetadata')

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

describe(`Strips the filename and extension from a relative file path`, () => {
  test('Single path returned with trailing slash', () => {
    const results = getRootPathsFromFilePath(`/avatars/john-smith.jpeg`)
    expect(results).toBe(`avatars/`)
  })

  test('Multiple paths returned with trailing slash', () => {
    const results = getRootPathsFromFilePath(`/promo/test/cover.webp`)
    expect(results).toBe(`promo/test/`)
  })
})

describe(`Tests if the filename matches the relative handling strategy`, () => {
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

describe(`Returns paths for the source image file, output directory, and <img> tag src string`, () => {
  let mock
  beforeEach(() => {
    mock = mockCwd('/var/www/eleventy')
  })

  afterEach(() => {
    mock.restore()
  })

  test('Homepage image filenames located in Markdown home file directory point to image assets directory in build folder', () => {
    const fileName = 'great-days.jpeg'
    const filePathStem = '/pages/home'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchInlineSnapshot(`
      {
        "imagePath": "/var/www/eleventy/src/pages/home/great-days.jpeg",
        "outputDir": "/var/www/eleventy/public/images/home",
        "urlPath": "/images/home/great-days.jpeg",
      }
    `)
  })

  test('Homepage image filenames with leading paths in image name located in Markdown home file directory point to image assets directory in build folder', () => {
    const fileName = 'carousel/great-days.jpeg'
    const filePathStem = '/pages/home'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchInlineSnapshot(`
      {
        "imagePath": "/var/www/eleventy/src/pages/home/carousel/great-days.jpeg",
        "outputDir": "/var/www/eleventy/public/images/home/carousel",
        "urlPath": "/images/home/carousel/great-days.jpeg",
      }
    `)
  })

  test('Absolute image filenames without leading path located side-by-side in Markdown file directories', () => {
    const fileName = '/john-smith.jpeg'
    const filePathStem = '/pages/articles/helloworld/index'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchInlineSnapshot(`
      {
        "imagePath": "/var/www/eleventy/src/assets/images/john-smith.jpeg",
        "outputDir": "/var/www/eleventy/public/images/articles/helloworld",
        "urlPath": "/images/john-smith.jpeg",
      }
    `)
  })

  test('Absolute image filenames located side-by-side in Markdown file directories', () => {
    const fileName = '/avatars/john-smith.jpeg'
    const filePathStem = '/pages/articles/helloworld/index'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchInlineSnapshot(`
      {
        "imagePath": "/var/www/eleventy/src/assets/images/avatars/john-smith.jpeg",
        "outputDir": "/var/www/eleventy/public/images/articles/helloworld",
        "urlPath": "/images/avatars/john-smith.jpeg",
      }
    `)
  })

  test('Articles relative image returns correct paths', () => {
    const fileName = 'cover.webp'
    const filePathStem = '/pages/articles/helloworld/index'
    const sut = getImagePaths(fileName, filePathStem)
    expect(sut).toMatchInlineSnapshot(`
      {
        "imagePath": "/var/www/eleventy/src/pages/articles/helloworld/cover.webp",
        "outputDir": "/var/www/eleventy/public/articles/helloworld",
        "urlPath": "/articles/helloworld/cover.webp",
      }
    `)
  })

  test('Nested relative image returns correct paths', () => {
    const fileName = 'feature/great.jpeg'
    const filePathStem = '/pages/articles/helloworld/index'
    const sut = getImagePaths(fileName, filePathStem)
    expect(sut).toMatchInlineSnapshot(`
      {
        "imagePath": "/var/www/eleventy/src/pages/articles/helloworld/feature/great.jpeg",
        "outputDir": "/var/www/eleventy/public/articles/helloworld",
        "urlPath": "/articles/helloworld/feature/great.jpeg",
      }
    `)
  })
})

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
