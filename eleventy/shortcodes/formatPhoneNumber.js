const parsePhoneNumber = require('libphonenumber-js')

/**
 * Format a phone number in numeric format
 * Usage: {% formatPhoneNumber "+12133734253" %}
 *
 * @param {object} _ Config object curried by loading script in .eleventy.js
 * @param {string} phoneNumber A numeric phone number e.g. `+12133734253`
 * @returns {string} The formatted phone number e.g. `(213) 373-4253`
 */
exports.formatPhoneNumber = (_, phoneNumber) => {
  return parsePhoneNumber(phoneNumber).format('NATIONAL')
}
