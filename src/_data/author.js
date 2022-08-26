/**
 * Expects global site author set in package.json in this format:
 * Kevin Brown <kevin@webstackbuilders.com> (https://webstackbuilders.com/)
 */
const { author } = require('../../package.json')

module.exports = _ => {
  const authorMatch = author.match(/^(.*)<(.*)>/)
  const name = authorMatch[1].trimEnd()
  const email = authorMatch[2]
  return {
    name,
    email,
    avatar: '/avatars/kevin-brown.webp',
    social: {
      twitter: {
        name: 'WebstackDev',
        url: 'https://twitter.com/WebstackDev',
      },
      github: {
        name: 'webstackdev',
        url: 'https://github.com/webstackdev',
      },
      linkedin: {
        name: '@TODO:needorgpage-set-in-author-_data-dir',
        url: 'https://www.linkedin.com/in/kevin-brown-b14b5298/',
      },
    },
  }
}
