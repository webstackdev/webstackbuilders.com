const path = require('path')
const { buildDir, imagesBuildDir, imagesSourceDir } = require('../../../scripts/build/paths')
const {
  getRootPathsFromFilePath,
  isRelativeFilePath,
  stripLeadingSlash,
  stripTrailingSlash,
} = require('./utils')
const { normalizeFilePathStem } = require('../../utils/permalinks')

/**
 * Home page images in `/pages/home` are output to the `images/home` folder in the build
 * directory. Filename can be either a filename with extension or a filename with a
 * subdirectory prefix.
 */
const caseHomePageImage = (fileName) => {
  const rootPaths = getRootPathsFromFilePath(fileName)
  return {
    /** Absolute path to the image file to be processed */
    imagePath: path.join(process.cwd(), `src/pages/home/`, fileName),
    /** Project-relative path to the output image directory to write generated images to */
    outputDir: stripTrailingSlash(path.join(process.cwd(), imagesBuildDir, `home`, rootPaths)),
    /**
     * Directory for the <img src> attribute. e.g. /images/home/ for
     * <img src="/images/home/MY_IMAGE.jpeg">
     */
    urlBasePath: path.join('/images/home/', rootPaths),
  }
}

/**
 * Avatar images included in Nunjucks or Javascript templates using the `image`
 * shortcode are maintained in the assets/images/avatars folder and should be
 * outputted to the /public/images directory. This is because avatars may be
 * used on multiple pages.
 */
const caseAvatarImage = (fileName) => {
  const normalizedFileName = stripLeadingSlash(fileName)
  const rootPaths = getRootPathsFromFilePath(fileName)
  return {
    /** Absolute path to the image file to be processed */
    imagePath: path.join(process.cwd(), imagesSourceDir, normalizedFileName),
    /** Project-relative path to the output image directory to write generated images to */
    outputDir: stripTrailingSlash(path.join(process.cwd(), imagesBuildDir, `avatars`)),
    /**
     * Directory for the <img src> attribute. e.g. /images/ for
     * <img src="/images/MY_IMAGE.jpeg">
     */
    urlBasePath: path.join('/images/', rootPaths),
  }
}

/**
 * Images with a leading slash are loaded from the assets/images folder
 * and outputted to the /public/images directory.
 */
const caseImageFromAssetsFolder = (fileName) => {
  const normalizedFileName = stripLeadingSlash(fileName)
  const rootPaths = getRootPathsFromFilePath(fileName)
  return {
    /** Absolute path to the image file to be processed */
    imagePath: path.join(process.cwd(), imagesSourceDir, normalizedFileName),
    /** Project-relative path to the output image directory to write generated images to */
    outputDir: stripTrailingSlash(path.join(process.cwd(), imagesBuildDir, rootPaths)),
    /**
     * Directory for the <img src> attribute. e.g. /images/ for
     * <img src="/images/MY_IMAGE.jpeg">
     */
    urlBasePath: path.join('/images/', rootPaths),
  }
}

/**
 * `fileName` values that are not relative paths are assumed to be being used in
 * a Markdown page, because images directly used in templates so far have been
 * maintained in the assets/images folder. This keeps image files for Markdown
 * pages in the page folder, next to index.md
 *
 * Case: isRelativeFilePath(fileName)
 */
const caseImageWithRelativePath = (fileName, filePathStem) => {
  if (!filePathStem.endsWith('/index'))
    throw new Error(`Relative images only make sense for pages that are nested in their own folder`)
  const relativeFilePath = normalizeFilePathStem(filePathStem)
  const rootPaths = getRootPathsFromFilePath(fileName)
  return {
    /** Absolute path to the image file to be processed */
    imagePath: path.join(process.cwd(), `src/pages`, relativeFilePath, fileName),
    /** Absolute path to the output image directory to write generated images to */
    outputDir: stripTrailingSlash(path.join(process.cwd(), buildDir, relativeFilePath, rootPaths)),
    /**
     * Directory for the <img src> attribute. e.g. /images/ for
     * <img src="/images/MY_IMAGE.jpeg">
     */
    urlBasePath: path.join(`/${relativeFilePath}`, rootPaths),
  }
}

/**
 * Image files are either in /public/images directory or in a Markdown page's folder
 * next to index.md. Sources that are absolute paths are assumed relative to the images
 * asset directory, otherwise assumed to be in the Markdown file's directory.
 *
 * @param {string} fileName - The path in the build output directory to the image.
 * @param {string} filePathStem - Eleventy's 'page.filePathStem' value.
 * @returns {object} - An object with 'imagePath', 'outputDir', and 'urlBasePath' keys.
 */
exports.getImagePaths = (fileName, filePathStem) => {
  const isAvatar = fileName.startsWith('/avatars/') || fileName.startsWith('avatars/')
  if (filePathStem.startsWith(`/pages/home`) && !isAvatar) {
    /* Home page images have to live in the public assets folder since there's no home folder */
    return caseHomePageImage(fileName)
    //
  } else if (isAvatar) {
    /* Avatar images are global for reuse */
    return caseAvatarImage(fileName)
    //
  } else if (fileName.startsWith('/')) {
    /* Images with a leading slash are loaded from the assets/images folder */
    return caseImageFromAssetsFolder(fileName)
    //
  } else if (isRelativeFilePath(fileName)) {
    /* Relative path images are loaded from the same folder as the content */
    return caseImageWithRelativePath(fileName, filePathStem)
    //
  } else {
    throw new Error(`Couldn't find a strategy to process image source, source file: ${fileName}`)
  }
}
