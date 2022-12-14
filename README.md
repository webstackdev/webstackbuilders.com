# Webstack Builders Corporate Website using Eleventy

## Template content

From the page object you can access `content` and within a collection you can use `templateContent` to get the rendered output not including layout wrappers.

`frontMatter.content` holds the raw markdown content without the frontmatter part:

```javascript
---
pagination:
  data: collections.post
  size: 10
  alias: posts
---
{% for post in posts %}
  {{ post.template.frontMatter.content | log }}
{% endfor %}
``

### Error:

`./src/pages/home/index.njk contains a circular reference (using collections) to its own templateContent. (via UsingCircularTemplateContentReferenceError)`

One fix showed:

```javascript
-    markdownTemplateEngine: 'njk',
+    markdownTemplateEngine: false,
```

**I was having the same issue with a liquid template (for rendering tags with post excerpts), so the problem seems to be universal. I also use the excerpt short code (with a custom function), so I guess the access to templateContent inside the excerpt function might be the culprit.

I have solved the problem (rather clumsily) with the following code snippet at the top of my excerpt function:**

```javascript
function excerpt(post){
  // list of template pages that iterate over post
  const iteratingTemplates = ['./src/index.liquid', './src/tags.liquid'];
  if (iteratingTemplates.indexOf(post.inputPath)>-1) {
    return null;
  }
 // now extract the excerpt from post.templateContent
}
```

**Of course this means that templates which contain lists can never have excerpts and that you have to add your specific template names to your custom excerpt function. A better approach would probably be to check somewhere in post.template if the template matches post.inputPath, preventing a post from trying to excerpt itself. But I don't know enough how 11ty works to know where to look for that information or if such an approach is even possible.**

## Nunjucks syntax

```nunjucks
{% import "components/file.njk" as file_component %}
{% for file in files %}
  {{ file_component.render(file) }}
{% endfor %}
```

## @TODO: Use Confetti on CTA forms

`canvas-confetti`
https://github.com/catdad/canvas-confetti
https://www.kirilv.com/canvas-confetti/


## @TODO: Use the Page Visibility API to stop unnecessary processes when the user doesn’t see the page or, on the other hand, to perform background actions. Some specific cases can be to pause videos, image carousels, or animations when the user leaves the page.

## @TODO: Add to Calendar button

https://github.com/add2cal/add-to-calendar-button
https://add-to-calendar-button.com/

## @TODO: Use a grid of cards for mobile nav menu, like the Windows start menu

Also instead of just displaying a Back button, we can stack all the previous sections like a breadcrumb under each other. And so we get a navigation stack.

## @TODO: Add Check HTML Links to test workflow

npm i -D check-html-links
npx check-html-links _site
https://github.com/modernweb-dev/rocket/tree/main/packages/check-html-links

## @TODO: Provide button to turn off animation in Hero

"Scaling/zooming animations are problematic for accessibility, as they are a common trigger for certain types of migraine. If you need to include such animations on your website, you should provide a control to allow users to turn off animations, preferably site-wide.  Also, consider making use of the prefers-reduced-motion media feature — use it to write a media query that will turn off animations if the user has reduced animation specified in their system preferences. "


## @TODO: add code to stop the Hero Greensocks animation when @media (prefers-reduced-motion: reduce), using window.mediaQuery()

## @TODO: Set up webmentions. This code goes in `_layouts/layouts/base.njk` after the last `<script>` tag in the document `<body>`:

```nunjucks
{%- if layout == 'layouts/articles/item' -%}
  <script src="{{ '/assets/scripts/webmentions.js' | url }}" defer></script>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{%- endif -%}
```

## @TODO: Implement draft status for collections (articles, services, case studies). Example:

```nunjucks
<li class="case-studies__item {% if casestudy.data.draft %}case-studies__item--draft{% endif %}">
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
  // You probably will not use this: `url` is better.
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

Be careful for `<title>`, `<link>`, and `<meta>` tags that vary between pages.

[Google Article on Streaming Service Worker Setup](https://developer.chrome.com/docs/workbox/faster-multipage-applications-with-streams/)

## CLI envs


```bash
clear && TS_NODE_PROJECT="tsconfig.gulp.json" yarn gulp build
```

```bash
clear && TS_NODE_PROJECT="tsconfig.jest.json" yarn jest eleventy/nunjucksAsyncShortcodes/asyncImageHandler/utils.spec.js --projects test/jest/jest.config.node.ts
```

```bash
clear && egrep -rnw './' --exclude-dir=node_modules --exclude-dir=.yarn -e 'searchString'
```

```bash
npx jest --clearCache
```

Problem with installing sharp, recommended install. See jest.setup.jsdom.ts
```bash
npm install --platform=linux --arch=x64 sharp
```

```tyepscript
import routes from 'https://example.com/routes.json' assert { type: 'json' };

import './global.css' assert { type: 'css' }
```

## Nice Jest packages

- jest-json-schema Provides `toMatchSchema(schema)` matcher
- jest-json Convenient JSON matchers
- jest-mock-extended Provides complete Typescript type safety for interfaces, argument types and return types, ability to mock any interface or object
- jest-localstorage-mock Provides a working localStorage API with mocked functions, maybe built-in to Jest now
- jest-canvas-mock If using canvas functions
- jest-fetch-mock
- jest-wake-lock-mock If using navigator.wakelock to keep a mobile device from dimming or powering down to save battery
-   Mocks out window.location and avoids errors with window.location.assign, reload, or replace
- jest-image-snapshot https://github.com/americanexpress/jest-image-snapshot @TODO: use for social share cards!

## Nice ESLint packages for Jest
- eslint-plugin-jest-extended Rules for `jest-extended` like `.toBeTrue()`, but having problem with types for the `jest-extended` matchers

