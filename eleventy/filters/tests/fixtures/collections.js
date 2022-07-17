exports.collections = [
  {
    inputPath: './src/pages/articles/test1/index.md',
    fileSlug: 'test1',
    outputPath: './public/articles/test1/index.html',
    url: '/articles/test1/',
    date: new Date(),
    data: { title: 'Test Title', slug: 'test-title', date: new Date(), tags: ['code'] },
    templateContent: '<h1>This is my title</h1>\n\n<p>This is content<p>',
  },
  {
    inputPath: './src/pages/about/index.md',
    fileSlug: 'about',
    outputPath: './public/about/index.html',
    url: '/about/',
    date: new Date(),
    data: { title: 'Test Title', slug: 'test-title', date: new Date(), tags: ['site'] },
    templateContent: '<h1>This is about us</h1>\n\n<p>This is content about us<p>',
  },
]
