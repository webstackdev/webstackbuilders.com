# Webstack Builders Corporate Website using Eleventy

## Nunjucks syntax

```nunjucks
{% import "components/file.njk" as file_component %}
{% for file in files %}
  {{ file_component.render(file) }}
{% endfor %}
```

## @TODO: Pages to create

- 404
- robots.txt
- privacy.md need to finish privacy policy

```md
---
permalink: robots.txt
eleventyExcludeFromCollections: true
layout: null
---

Sitemap: <%= `${site.url}/sitemap.xml` %>
```

## @TODO: exclude pages like 404 from the sitemap.

Mxb's template uses a `excludeFromSitemap` variable to exclude pages from the sitemap:

```js
{%- if not item.data.excludeFromSitemap and item.url -%}
```

## Preload hero images, usually loaded after stylesheets and fonts

```font
<head>
  <!-- Hey browser! Please preload this important responsive image -->
  <link
    rel="preload"
    as="image"
    imagesrcset="
      image-400.jpg 400w,
      image-800.jpg 800w,
      image-1600.jpg 1600w"
    imagesizes="100vw"
  >
</head>
<body>
  <img
    srcset="
      image-400.jpg 400w,
      image-800.jpg 800w,
      image-1600.jpg 1600w"
    sizes="100vw"
    alt="..."
  >
</body>
```

## Lighthouse

Display a system font until font files load to improve FCP (First Contentful Paint) with `font-display: swap`.
Need to make sure that web font doesn't render larger or smaller than the system font fallback to avoid CLS
(Cumulative Layout Shift) issues.

```css
@font-face {
  font-family: 'Pacifico';
  font-style: normal;
  font-weight: 400;
  src: local('Pacifico Regular'), local('Pacifico-Regular'),
    url(https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2) format('woff2');
  font-display: swap;
}
```

Preload fonts:

```html
<link rel="preload" as="font" />
```

TTI (Time to Interactive) measures time from when the page is painted until it becomes usefully interactive.
Interactive can only have two in-flight network requests.

@TODO: In-line SVG images, Javascript, and critical CSS.

## BFCache

Never add an `unload` event listener. It prevents pages from being cached in the modern bfcache system.

Use the `pagehide` event. The `pagehide` event fires in all cases where the `unload` event
currently fires, and it also fires when a page is put in the bfcache.

Close connections and remove or disconnect observers during the `pagehide` or `freeze` events,
including open `IndexedDB` connections, in-progress `fetch()` or `XMLHttpRequest`, and open
`WebSocket` or `WebRTC` connections. If the page is restored from the bfcache, you can re-open
or re-connect to those APIs on the `pageshow` or `resume` events.

## Collections

Collections use the `tag` label in YAML frontmatter to sort pages.

```njk
{%- for post in collections.post -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
```

Each collection item has the following keys available on it:

- inputPath: the full path to the source input file (including the path to the input directory)
- fileSlug: for permalinks - inputPath filename minus template file extension.
- outputPath: the full path to the output file to be written for this content
- url: url used to link to this piece of content.
- date: the resolved JS Date Object used for sorting. Read more about Content Dates.
- data: all data for this piece of content (includes any data inherited from layouts)
- templateContent: the rendered content of this template. This does not include layout wrappers.

```js
let page = {
  // URL can be used in <a href> to link to other templates
  // Note: This value will be `false` if `permalink` is set to `false`.
  url: '/current/page/myFile/',

  // For permalinks: inputPath filename minus template file extension
  fileSlug: 'myFile',

  // For permalinks: inputPath minus template file extension
  filePathStem: '/current/page/myFile',

  // JS Date Object for current page (used to sort collections)
  date: new Date(),

  // The path to the original source file for the template
  // Note: this will include your input directory path!
  inputPath: './current/page/myFile.md',

  // Depends on your output directory (the default is _site)
  // You probably won’t use this: `url` is better.
  // Note: This value will be `false` if `permalink` is set to `false`.
  outputPath: './_site/current/page/myFile/index.html',

  // Added in 1.0
  // Useful with `page.filePathStem` when using custom file extensions.
  outputFileExtension: 'html',
}
```

## Streaming Service Worker for Precaching

This strategy avoids reloading the page template with inline SVGs and styles. It would allow inlining all Javascript and stylesheets as well. For a static Eleventy site, it requires generating two versions of each page: one version will contain the full page markup, while the other will contain only the content.

- Create a file containing only your website's header markup.
- Create a file containing only your website's footer markup.
- Pull out each page's main content into a separate file, or set up your back end to conditionally serve only the page content based on an HTTP request header.

Be careful for <title>, <link>, and <meta> tags that vary between pages.

[Google Article on Streaming Service Worker Setup](https://developer.chrome.com/docs/workbox/faster-multipage-applications-with-streams/)

## Plugins to Setup and Include

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

## Highlight Share Plugin

Put this around text that should be highlighted for share, like the way Medium does:

{% highlight %}Here's some highlighted text you can share!{% endhighlight %}
