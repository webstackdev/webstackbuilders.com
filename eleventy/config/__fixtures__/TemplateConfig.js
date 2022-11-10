const TemplateConfig = require('../../../node_modules/@11ty/eleventy/src/TemplateConfig')

exports.mergeConfig = () => {
  const templateConfig = new TemplateConfig()
  return templateConfig.mergeConfig()
}

