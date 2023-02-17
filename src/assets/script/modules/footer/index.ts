/**
 * Script for the footer
 */

export const footerInit = () => {
  // @TODO: 1. set month and year in footer__hire-me: date.getMonth() + 1 as number 1-12, date.getFullYear() and set display to block. Maybe don't show on contact page?
}

// Available {month}, {year}. Hire Me Now >

function getMonthName(monthNumber) {
  const date = new Date()
  date.setMonth(monthNumber - 1)

  return date.toLocaleString('en-US', { month: 'long' })
}
