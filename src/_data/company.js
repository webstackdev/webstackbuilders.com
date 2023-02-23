/**
 * Use by the name of the file and the key: {{ author.avatar }}
 * Expects global site author set in package.json in this format:
 * Kevin Brown <kevin@webstackbuilders.com> (https://webstackbuilders.com/)
 */
module.exports = _ => {
  return {
    name: 'Webstack Builders',
    email: 'support@webstackbuilders.com',
    address: '2093 Philadelphia Pike',
    city: 'Claymont',
    state: 'DE',
    index: '19703',
    telephoneLocal: '+13026086864',
    telephoneTollFree: '+18889871881',
    social: {
      codepen: {
        name: 'WebstackDev',
        url: 'https://twitter.com/WebstackDev',
      },
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
