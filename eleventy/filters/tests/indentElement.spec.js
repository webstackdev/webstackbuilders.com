/**
 * Unit and integration test for indent element filter
 */
const path = require(`path`)
const { eleventyProgrammatic } = require('../../../test/11tyProgrammatic')
const { indentElement } = require('../indentElement')

describe(`indent element filter tests`, () => {
  test(`indent element filter passes integration test`, async () => {
    const indentElementJson = await eleventyProgrammatic(
      path.resolve(`eleventy/filters/tests/fixtures/indentElement.11ty.js`)
    )
    expect(indentElementJson).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "<p>some-content</p>
      ",
          "inputPath": "/home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/eleventy/filters/tests/fixtures/indentElement.11ty.js",
          "outputPath": "public/indentElement/index.html",
          "url": "/indentElement/",
        },
      ]
    `)
  })
})

/*
Array [
  Object {
    "content": "<p><span>some content</span></p>",
    "inputPath": "/home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/eleventy/filters/tests/fixtures/indentElement.11ty.js",
    "outputPath": "public/some-content/index.html",
    "url": "/some-content/",
  },
]

{
  page: {
    date: 2022-07-15T10:40:47.599Z,
    inputPath: '/home/kevin/Repos/webstackdev/eleventy.webstackbuilders.com/eleventy/filters/tests/fixtures/indentElement.11ty.js',
    fileSlug: 'indentElement',
    filePathStem: '/indentElement',
    outputFileExtension: 'html',
    url: '/some-content/',
    outputPath: 'public/some-content/index.html'
  },
  slug: [Function: bound ],
  slugify: [Function: bound ],
  url: [Function: bound ],
  log: [Function: bound ],
  serverlessUrl: [Function: bound ],
  getCollectionItem: [Function: bound ],
  getPreviousCollectionItem: [Function: bound ],
  getNextCollectionItem: [Function: bound ],
  currentPage: [Function: bound ],
  dateToFormat: [Function: bound ],
  dateToISO: [Function: bound ],
  dateFromISO: [Function: bound ],
  excerpt: [Function: bound ],
  exclude: [Function: bound ],
  excludeItemFromCollection: [Function: bound ],
  findById: [Function: bound ],
  humanizeNumber: [Function: bound ],
  indentElement: [Function: bound ],
  obfuscate: [Function: bound ],
  readableDate: [Function: bound ],
  setExt: [Function: bound ],
  slice: [Function: bound ],
  withCategory: [Function: bound ],
  customMarkdownShortcode: [Function: bound ],
  icon: [Function: bound ],
  pageDescription: [Function: bound ],
  pageSocialImg: [Function: bound ],
  pageTitle: [Function: bound ],
  youtubeShortcode: [Function: bound ],
  year: [Function: bound ],
  callout: [Function: bound ],
  signup: [Function: bound ],
  eleventyNavigation: [Function: bound ],
  eleventyNavigationBreadcrumb: [Function: bound ],
  eleventyNavigationToHtml: [Function: bound ],
  eleventyNavigationToMarkdown: [Function: bound ],
  addNbsp: [Function: bound ]
}
*/
