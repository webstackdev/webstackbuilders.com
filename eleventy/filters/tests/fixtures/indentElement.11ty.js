/**
 * Fixture to run filter or shortcode to be tested using 11ty programmatic CLI
 * Universal filters, shortcodes, and other JavaScript Template Functions work
 * here and are exposed on `this`. Example providing `permalink` function.
 */

// Using `this` in an arrow function will throw an error
class indentElementTest {
  data() {
    return {
      title: 'Some Content',
      // does not support Nunjucks as an override, Markdown only
      templateEngineOverride: '11ty.js,md',
    }
  }

  // global data, filters, shortcodes, etc. on `this` object ${this.indentElement(data.title)}
  render(data) {
    return this.slug(data.title)
  }
}

module.exports = indentElementTest
