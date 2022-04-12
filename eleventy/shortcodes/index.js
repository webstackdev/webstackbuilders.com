const { customShortcode } = require('./markdown')
exports.customShortcode = customShortcode

const { imgShortcode } = require('./img')
exports.imgShortcode = imgShortcode

const { youtubeShortcode } = require('./youtube')
exports.youtubeShortcode = youtubeShortcode

exports.year = () => `${new Date().getFullYear()}`
