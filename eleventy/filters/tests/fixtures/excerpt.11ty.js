/**
 * Fixture to run the built-in Gray Matter excerpt filter using 11ty programmatic CLI
 * for integration tests. This filter splits the content into excerpt and remainder
 * on the excerpt separator:
 * '<!--more-->'.
 *
 * Usage:
 *   {{ post.templateContent | excerpt | striptags }}
 */
class excerptTest {
  data() {
    return {
      markup: `---\nfoo: bar\n---\nThis is an excerpt.\n<!-- excerpt -->\nThis is content`,
      // does not support Nunjucks as an override, Markdown only
      templateEngineOverride: '11ty.js,md',
    }
  }

  render(data) {
    return data.markup
  }
}

module.exports = excerptTest
