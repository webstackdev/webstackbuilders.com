/**
 * @TODO: Build miscellaneous assets. Break these out into individual files
 *        for granular control over execution timing. These are currently set
 *        in .eleventy.js:
 * Files to pass through to the `public` folder. Strips `input` from the path (`src` here).
eleventyConfig.addPassthroughCopy('src/manifest.json')
eleventyConfig.addPassthroughCopy('src/robots.txt')
eleventyConfig.addPassthroughCopy({ 'src/assets/images/favicon': 'images/favicon' })
eleventyConfig.addPassthroughCopy({ 'src/assets/images/site': 'images/site' })
eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'fonts' })
 */
