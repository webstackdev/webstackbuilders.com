/**
 * Configuration for Axe accessibility library
 */
const { configureAxe } = require(`jest-axe`)

exports.axe = configureAxe({
  impactLevels: ['minor'],
  rules: {
    /** Doesn't work with JSDOM */
    'color-contrast': { enabled: false },
    /** Skip check for content being contained by landmark region */
    region: { enabled: false },
  },
})
