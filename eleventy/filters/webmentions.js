const sanitizeHTML = require('sanitize-html')

/**
 * Usage:
 *   <div class="webmention {% if webmention|isOwnWebmention %}webmention--own{% endif %}" id="webmention-{{ webmention['wm-id'] }}">
 */
exports.isOwnWebmention = function (webmention) {
  const urls = [
    'https://mxb.at',
    'https://mxb.dev',
    'https://twitter.com/mxbck'
  ]
  const authorUrl = webmention.author ? webmention.author.url : false
  // check if a given URL is part of this site.
  return authorUrl && urls.includes(authorUrl)
}

/**
 * Usage:
 *   {%- set mentions = webmentions.children | webmentionsByUrl(webmentionUrl) -%}
 */
exports.webmentionsByUrl = function (webmentions, url) {
  const allowedTypes = ['mention-of', 'in-reply-to']
  const allowedHTML = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href']
    }
  }

  const orderByDate = (a, b) => new Date(a.published) - new Date(b.published)

  const checkRequiredFields = (entry) => {
    const { author, published, content } = entry
    return !!author && !!author.name && !!published && !!content
  }

  const clean = (entry) => {
    const { html, text } = entry.content
    if (html) {
      // really long html mentions, usually newsletters or compilations
      entry.content.value = html.length > 2000
        ? `mentioned this in <a href="${entry['wm-source']}">${entry['wm-source']}</a>`
        : sanitizeHTML(html, allowedHTML)
    } else {
      entry.content.value = sanitizeHTML(text, allowedHTML)
    }
    return entry
  }

  return webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter((entry) => allowedTypes.includes(entry['wm-property']))
    .filter(checkRequiredFields)
    .sort(orderByDate)
    .map(clean)
}

/**
 * Usage:
 *   {%- set likeCount = webmentions.children | webmentionCountByType(webmentionUrl, "like-of") -%}
 */
exports.webmentionCountByType = function (webmentions, url, ...types) {
  const isUrlMatch = (entry) =>
    entry['wm-target'] === url ||
    entry['wm-target'] === url.replace('mxb.dev', 'mxb.at')

  return String(
    webmentions
      .filter(isUrlMatch)
      .filter((entry) => types.includes(entry['wm-property'])).length
  )
}
