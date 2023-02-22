/**
 * Get the year as a four-digit number
 * Usage: {% year %}
 * 
 * @param {object} _ Config object curried by loading script in .eleventy.js
 * @returns {string} The full year in numeric format, e.g. 1969
 */
exports.year = (_) => new Date().getFullYear()
