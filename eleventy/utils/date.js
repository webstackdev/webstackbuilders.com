/**
 * Generate an ISO 8601 Extended timedate stamp for use in the build metadata script
 */
const { dateToISO } = require(`../filters/date`)

exports.getCurrentDateTime = () => {
  return dateToISO(new Date())
}
