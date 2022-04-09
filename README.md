# Webstack Builders Corporate Website using Eleventy

## @TODO

- 404
- robots.txt

```md
---
permalink: robots.txt
eleventyExcludeFromCollections: true
layout: null
---

Sitemap: <%= `${site.url}/sitemap.xml` %>
```

## Collections

Collections use the `tag` label in YAML frontmatter to sort pages.

```njk
{%- for post in collections.post -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
```

Each collection item has the following keys available on it:

- inputPath: the full path to the source input file (including the path to the input directory)
- fileSlug: Mapped from the input file name, useful for permalinks. Read more about fileSlug.
- outputPath: the full path to the output file to be written for this content
- url: url used to link to this piece of content.
- date: the resolved JS Date Object used for sorting. Read more about Content Dates.
- data: all data for this piece of content (includes any data inherited from layouts)
- templateContent: the rendered content of this template. This does not include layout wrappers.

## Plugins

- [eleventy-plugin-rss](https://www.npmjs.com/package/@11ty/eleventy-plugin-rss) A pack of Eleventy filters for generating Atom and JSON feeds using the Nunjucks templating engine.
- [eleventy-google-fonts](https://www.npmjs.com/package/eleventy-google-fonts) Download and inline Google Font's CSS.
- [eleventy-plugin-time-to-read](https://www.npmjs.com/package/eleventy-plugin-time-to-read) filter that approximates how long it would take a user to read a given text and outputs the result in your choice of language and format.
- [@quasibit/eleventy-plugin-sitemap](https://www.npmjs.com/package/@quasibit/eleventy-plugin-sitemap) generate a sitemap using `ekalinin/sitemap` generator.
- [@sardine/eleventy-plugin-external-links](https://www.npmjs.com/package/@sardine/eleventy-plugin-external-links) adds `target="_blank" rel="noreferrer"` to all external links to make them safer.
- [eleventy-plugin-lazyimages](https://www.npmjs.com/package/eleventy-plugin-lazyimages) finds IMG elements in your markup, adds width and height attributes to the element, defers loading the image until it is in/near the viewport (lazy loading), and displays a blurry low-res placeholder until the image has loaded (LQIP).
- [@sardine/eleventy-plugin-tinysvg](https://www.npmjs.com/package/@sardine/eleventy-plugin-tinysvg) inline SVG files and optimizes them with SVGO to keep them as small as possible.
- [eleventy-plugin-meta-generator](https://www.npmjs.com/package/eleventy-plugin-meta-generator) adds a meta-generator tag to the head of the generated html files.
- [eleventy-plugin-nesting-toc](https://www.npmjs.com/package/eleventy-plugin-nesting-toc) generates a nested table of content from page content using an filter.
- [@mightyplow/eleventy-plugin-cache-buster](https://www.npmjs.com/package/@mightyplow/eleventy-plugin-cache-buster) adds a unique query parameter to css and js resources.
- [eleventy-plugin-pwa](https://www.npmjs.com/package/eleventy-plugin-pwa) generates a service worker using Google Workbox to generate `service-worker.js` based on your `dir.output`.
- [eleventy-plugin-emoji](https://www.npmjs.com/package/eleventy-plugin-emoji) shortcode and filter that take an emoji and optional label, and wrap it in a containing element with the appropriate accessibility attributes.
- [eleventy-favicon](https://www.npmjs.com/package/eleventy-favicon) generates `favicon.ico` and `apple-touch-icon.png` from a single image file, including svg files, and generates necessary html link tags.
- [eleventy-plugin-schema](https://github.com/quasibit/eleventy-plugin-schema) generate JSON-LD script including the `<script>` tag, supports WebSite, BlogPosting, WebPage, Product, Organization, Breadcrumbs, SearchAction, FAQPage, and Videos schema types.
- [@vidhill/fortawesome-regular-11ty-shortcode](https://www.npmjs.com/package/@vidhill/fortawesome-free-regular-11ty-shortcode) embed `Font Awesome 5` fonts as inline svg.
- [@fec/eleventy-plugin-remark](https://www.npmjs.com/package/@fec/eleventy-plugin-remark) transpile Markdown with Remark, and use Remark plugins.
- [@11ty/eleventy-plugin-syntaxhighlight](https://www.11ty.dev/docs/plugins/syntaxhighlight/) PrismJS syntax highlighting. No browser/client JavaScript here, these highlight transformations are all done at build-time. Supports individual line highlighting.
