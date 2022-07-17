const { DateTime } = require('luxon')

/**
 * Usage:
 *   {{ build.timestamp | dateToFormat('yyyy') }}
 * Friday, July 15, 2022 at 11:39:50 PM GMT+3
 */
exports.dateToFormat = (date, format) => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(String(format))
}

/**
 * Usage:
 *   <time dateTime="{{ post.date | dateToISO }}">{ post.date | readableDate }</time>
 */
exports.dateToISO = date => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
    includeOffset: false,
    suppressMilliseconds: true,
  })
}

/**
 * Usage:
 *   {{ webmention.published | dateFromISO | readableDate("dd LLL yyyy") }}
 */
exports.dateFromISO = timestamp => {
  return DateTime.fromISO(timestamp, { zone: 'utc' }).toJSDate()
}

/**
 * Friendly date filter. Supported tokens:
 * https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
 * Usage:
 *   {{ date | readableDate('dd LLL yyyy') }}
 */
exports.readableDate = (date, format) => {
  const datetimeObj = DateTime.fromJSDate(date, { zone: 'utc' })
  if (!format) {
    format = datetimeObj.hour + datetimeObj.minute > 0 ? 'dd LLL yyyy - HH:mm' : 'dd LLL yyyy'
  }
  return datetimeObj.toFormat(format)
}
