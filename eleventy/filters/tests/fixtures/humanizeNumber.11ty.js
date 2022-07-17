/**
 * Fixture to run the humanize number filter using 11ty programmatic CLI for
 * integration tests. This filter prints high numbers with a "K" suffix.
 *
 * Usage:
 *   {{ 1000 | humanizeNumber }}
 */
class humanizeNumberTest {
  data() {
    return {
      // does not support Nunjucks as an override, Markdown only
      templateEngineOverride: '11ty.js,md',
    }
  }

  render() {
    return this.humanizeNumber(1000)
  }
}

module.exports = humanizeNumberTest
