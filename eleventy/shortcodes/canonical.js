/**
 * Determine the canonical URL for a page
 *
 * @param _
 * @param page
 */
exports.canonical = (_, page) => {
  // eleventyConfig.globalData.baseUrl
  // maybe using absoluteUrl filter here
  // @TODO: need to implement canonical shortcode
  /*
  Page object:

  // URL can be used in <a href> to link to other templates
  // Note: This value will be `false` if `permalink` is set to `false`.
  url: "/current/page/myFile/",

  // For permalinks: inputPath filename minus template file extension
  fileSlug: "myFile",

  // For permalinks: inputPath minus template file extension
  filePathStem: "/current/page/myFile",

  // JS Date Object for current page (used to sort collections)
  date: new Date(),

  // The path to the original source file for the template
  // Note: this will include your input directory path!
  inputPath: "./current/page/myFile.md",

  // Depends on your output directory (the default is _site)
  // You probably won’t use this: `url` is better.
  // Note: This value will be `false` if `permalink` is set to `false`.
  outputPath: "./_site/current/page/myFile/index.html",

  // Useful with `page.filePathStem` when using custom file extensions.
  outputFileExtension: "html
  */
  return page
}
