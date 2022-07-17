/**
 * Fixture to run the format date filter using 11ty programmatic CLI for integration tests.
 *   {{ build.timestamp | dateToFormat('yyyy') }}
 */
class dateToFormatTest {
  data() {
    return {
      // does not support Nunjucks as an override, Markdown only
      templateEngineOverride: '11ty.js,md',
    }
  }

  render() {
    return this.dateToFormat(`Friday, July 15, 2022 at 11:39:50 PM GMT+3`)
  }
}

module.exports = dateToFormatTest
