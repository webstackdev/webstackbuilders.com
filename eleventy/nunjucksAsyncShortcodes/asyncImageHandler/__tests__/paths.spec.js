/**
 * Tests return paths for the source image file, output directory, and <img> tag src string
 */
const { describe, expect, test } = require('@jest/globals')
const mockCwd = require('mock-cwd').mockCwd
const { getImagePaths } = require('../paths')

let mock
beforeEach(() => {
  mock = mockCwd('/var/www/eleventy')
})

afterEach(() => {
  mock.restore()
})

describe(`caseHomePageImage`, () => {
  test('Homepage image filenames located in Markdown home file source directory point to image assets directory in build folder', () => {
    const fileName = 'great-days.jpeg'
    const filePathStem = '/pages/home'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchObject({
      imagePath: "/var/www/eleventy/src/pages/home/great-days.jpeg",
      outputDir: "/var/www/eleventy/public/images/home",
      urlBasePath: "/images/home/",
    })
    //expect(paths).toMatchInlineSnapshot()
  })

  test('Homepage image filenames with leading paths in image name located in Markdown home file directory point to image assets directory in build folder', () => {
    const fileName = 'carousel/great-days.jpeg'
    const filePathStem = '/pages/home'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchObject({
      imagePath: '/var/www/eleventy/src/pages/home/carousel/great-days.jpeg',
      outputDir: '/var/www/eleventy/public/images/home/carousel',
      urlBasePath: '/images/home/carousel/',
    })
  })
})

describe(`caseAvatarImage`, () => {
  test('absolute image filenames in the avatars directory are handled correctly', () => {
    const fileName = '/avatars/john-smith.jpeg'
    const filePathStem = '/pages/articles/helloworld/index'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchObject({
      imagePath: "/var/www/eleventy/src/assets/images/avatars/john-smith.jpeg",
      outputDir: "/var/www/eleventy/public/images/avatars",
      urlBasePath: "/images/avatars/",
    })
  })

  test('relative image filenames in the avatars directory are handled correctly', () => {
    const fileName = 'avatars/john-smith.jpeg'
    const filePathStem = '/pages/articles/helloworld/index'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchObject({
      imagePath: "/var/www/eleventy/src/assets/images/avatars/john-smith.jpeg",
      outputDir: "/var/www/eleventy/public/images/avatars",
      urlBasePath: "/images/avatars/",
    })
  })

  test('can use avatar images on the home page', () => {
    const fileName = '/avatars/john-smith.jpeg'
    const filePathStem = '/pages/home'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchObject({
      imagePath: '/var/www/eleventy/src/assets/images/avatars/john-smith.jpeg',
      outputDir: '/var/www/eleventy/public/images/avatars',
      urlBasePath: '/images/avatars/',
    })
  })
})

describe(`caseImageFromAssetsFolder`, () => {
  test('leading an image filename with a forward slash loads the image from the assets/images directory', () => {
    const fileName = '/john-smith.jpeg'
    const filePathStem = '/pages/articles/helloworld/index'
    const paths = getImagePaths(fileName, filePathStem)
    expect(paths).toMatchObject({
      imagePath: "/var/www/eleventy/src/assets/images/john-smith.jpeg",
      outputDir: "/var/www/eleventy/public/images/articles/helloworld",
      urlBasePath: "/images/",
    })
  })
})

describe(`caseImageWithRelativePath`, () => {
  test('plain filename with extension is loaded from same folder as content', () => {
    const fileName = 'cover.webp'
    const filePathStem = '/pages/articles/helloworld/index'
    const sut = getImagePaths(fileName, filePathStem)
    expect(sut).toMatchObject({
      imagePath: "/var/www/eleventy/src/pages/articles/helloworld/cover.webp",
      outputDir: "/var/www/eleventy/public/articles/helloworld",
      urlBasePath: "/articles/helloworld/",
    })
  })

  test('nested relative image returns correct paths', () => {
    const fileName = 'feature/great.jpeg'
    const filePathStem = '/pages/articles/helloworld/index'
    const sut = getImagePaths(fileName, filePathStem)
    expect(sut).toMatchObject({
      imagePath: '/var/www/eleventy/src/pages/articles/helloworld/feature/great.jpeg',
      outputDir: '/var/www/eleventy/public/articles/helloworld',
      urlBasePath: '/articles/helloworld/feature/',
    })
  })
})
