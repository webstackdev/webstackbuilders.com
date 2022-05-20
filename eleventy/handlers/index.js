const { pageNotFoundHandler } = require('./pageNotFoundHandler')

module.exports = {
  /**
   * 404 error page routing for use by dev server, this can be removed in 11ty v2
   */
  pageNotFoundHandler,

  /**
   * Copies PDF and video asset files to the public folder
   * using same directory structure as input pages
   */
  pluginPageAssetsConfig: {
    mode: 'parse',
    postsMatching: 'src/pages/*/*.md',
    assetsMatching: '*.pdf|*.mp4|*.webm|*.avi',
    hashAssets: false,
  },
}
