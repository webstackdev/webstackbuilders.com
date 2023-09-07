const { getBaseURL } = require('./url')
exports.getBaseURL = getBaseURL

const { getCurrentDateTime } = require('./date')
exports.getCurrentDateTime = getCurrentDateTime

const { extensionsInit } = require('./extensions')
exports.extensionsInit = extensionsInit

const { minify } = require('./minify')
exports.minify = minify

const { getCoverImageFilePath } = require('./coverImage')
exports.getCoverImageFilePath = getCoverImageFilePath

const { getPermalinkPath } = require('./permalinks')
exports.getPermalinkPath = getPermalinkPath

const { initDraftHandler } = require('./permalinks')
exports.initDraftHandler = initDraftHandler
