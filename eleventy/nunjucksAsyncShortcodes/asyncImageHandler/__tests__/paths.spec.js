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

/**
 * Second parameter to getImagePaths() is `page.filePathStem`:
 * inputPath              page.filePathStem Result
 * 2018-01-01-myFile.md  	myFile
 * myDir/myFile.md 	      myDir/myFile
 */
describe(`caseHomePageImage`, () => {
  test('relative image filenames on the home page work', () => {
    const sut = getImagePaths('myImage.jpeg', '/pages/home/index')
    expect(sut).toMatchObject({
      imagePath: '/var/www/eleventy/src/pages/home/myImage.jpeg',
      outputDir: '/var/www/eleventy/public/images/home',
      urlBasePath: '/images/home/',
    })
  })

  test('relative image filenames with leading paths on the home page work', () => {
    const sut = getImagePaths('carousel/myImage.jpeg', '/pages/home/index')
    expect(sut).toMatchObject({
      imagePath: '/var/www/eleventy/src/pages/home/carousel/myImage.jpeg',
      outputDir: '/var/www/eleventy/public/images/home/carousel',
      urlBasePath: '/images/home/carousel/',
    })
  })
})

describe(`caseAvatarImage`, () => {
  test('absolute image filenames in the avatars directory work', () => {
    const sut = getImagePaths('/avatars/myImage.jpeg', '/pages/articles/helloworld/index')
    expect(sut).toMatchObject({
      imagePath: '/var/www/eleventy/src/assets/images/avatars/myImage.jpeg',
      outputDir: '/var/www/eleventy/public/images/avatars',
      urlBasePath: '/images/avatars/',
    })
  })

  test('relative image filenames in the avatars directory work', () => {
    const sut = getImagePaths('avatars/myImage.jpeg', '/pages/articles/helloworld/index')
    expect(sut).toMatchObject({
      imagePath: '/var/www/eleventy/src/assets/images/avatars/myImage.jpeg',
      outputDir: '/var/www/eleventy/public/images/avatars',
      urlBasePath: '/images/avatars/',
    })
  })

  test('relative image filenames with avatar as the path on the home page work', () => {
    const sut = getImagePaths('/avatars/myImage.jpeg', '/pages/home/index')
    expect(sut).toMatchObject({
      imagePath: '/var/www/eleventy/src/assets/images/avatars/myImage.jpeg',
      outputDir: '/var/www/eleventy/public/images/avatars',
      urlBasePath: '/images/avatars/',
    })
  })
})

describe(`caseImageFromAssetsFolder`, () => {
  test('absolute image filename loads the image from the assets/images directory', () => {
    const sut = getImagePaths('/myImage.jpeg', '/pages/articles/helloworld/index')
    expect(sut).toMatchObject({
      imagePath: '/var/www/eleventy/src/assets/images/myImage.jpeg',
      outputDir: '/var/www/eleventy/public/images',
      urlBasePath: '/images/',
    })
  })

  test('absolute image filename with paths loads the image from the assets/images/path directory', () => {
    const sut = getImagePaths('/path/myImage.jpeg', '/pages/articles/helloworld/index')
    expect(sut).toMatchObject({
      imagePath: '/var/www/eleventy/src/assets/images/path/myImage.jpeg',
      outputDir: '/var/www/eleventy/public/images/path',
      urlBasePath: '/images/path/',
    })
  })
})

describe(`caseImageWithRelativePath`, () => {
  test('relative image filename works', () => {
    const sut = getImagePaths('myImage.webp', '/pages/articles/helloworld/index')
    expect(sut).toMatchObject({
      imagePath: "/var/www/eleventy/src/pages/articles/helloworld/myImage.webp",
      outputDir: "/var/www/eleventy/public/articles/helloworld",
      urlBasePath: "/articles/helloworld/",
    })
  })

  test('relative image filename with paths works', () => {
    const sut = getImagePaths('feature/myImage.jpeg', '/pages/articles/helloworld/index')
    expect(sut).toMatchObject({
      imagePath: '/var/www/eleventy/src/pages/articles/helloworld/feature/myImage.jpeg',
      outputDir: '/var/www/eleventy/public/articles/helloworld/feature',
      urlBasePath: '/articles/helloworld/feature/',
    })
  })

  test('relative image filename where the including file is stand-alone throws', () => {
    expect(() => getImagePaths('feature/myImage.jpeg', '/pages/site/somepage')).toThrow()
  })
})
