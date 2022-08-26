# Dependencies

This is to document where dependencies are used so unused dependencies can be removed

```bash
egrep -rnw --exclude-dir=node_modules --exclude=yarn.lock --exclude=yarn-error.log '.' -e 'yargs'
```

## Build and package.json

```json
@github-docs/frontmatter // used in validateFrontmatter script
@types/node // used by Gulp
@types/gulp // used by Gulp
@types/serve-static // used in eleventy global type definitions in @types directory
@yarnpkg/cli // used in Yarn plugin
chalk // used in validateFrontmatter script
critical
cross-var
dotenv
dotenv-cli
html-minifier // used in shortcodes
lazypipe // used to factor out pipe() calls in gulp tasks for testing
map-stream // testing Gulp pipe workflows
markdown-frontmatter-processor // used in validateFrontmatter script to write dates back
netlify-lambda
np // a better npm publish, used in package.json script
npm-run-all
npm-scripts-info // use a scripts-info key in package.json w/ text messags for scripts
plumber // used in Gulp tasks
read-pkg-up // used in gulpfile dynamic templates to get npm-scripts-info
sass
serve
sprintf-js // used in validateFrontmatter script
terser
terser-webpack-plugin
ts-node // used by Gulp to load gulpfile.ts
webpack
webpack-cli
webpack-merge
workbox-cli
vinyl-string // testing Gulp pipe workflows
```

## Cache busting script in \_data

```json
md5-file
```

## ./scripts/npm-package-scripts

```json

```

## Used in Gulpfile

```json
cssnano
del
fancy-log
glob
gulp
gulp-if
gulp-postcss
gulp-sass
gulp-sourcemaps
gulp-svg-sprite
mkdirp // peer dependency
postcss-preset-env
postcss-svgo
workbox-cli // Google's service worker generator
icon-gen // Favicon generator
```

## Eleventy plugins and config

```json
@11ty/eleventy
@11ty/eleventy-img
@11ty/eleventy-navigation
@11ty/eleventy-plugin-directory-output
@11ty/eleventy-plugin-inclusive-language
@11ty/eleventy-plugin-rss
@11ty/eleventy-plugin-syntaxhighlight
@11tyrocks/eleventy-plugin-social-images
eleventy-plugin-lazyimages
eleventy-plugin-page-assets
eleventy-plugin-share-highlight
luxon // date-time lib used in filters
markdown-it
markdown-it-anchor
markdown-it-emoji
posthtml // this and posthtml-urls used in 'htmlToAbsoluteUrls' filter over ride
posthtml-urls
postcss
sharp // used in image lazy loading script
```

## Testing

If you get red output in a passing test run from Jest, it could be console errors
passed from other things besides Jest. You can quiet that with `jest-mock-console`

```json
@babel/core
@babel/preset-typescript
@testing-library/jest-dom // DOM matchers
@types/jest
@types/jest-axe
babel-jest
canvas // allow JSDOM to use <canvas> elements instead of converting them to <div>
cypress
html-entities-decoder // used in eleventy/markdown/tests/replacements.spec.js
jest
jest-axe // accessibility testing
jest-environment-jsdom // must be installed separately to use jsdom
jsdom
mock-cwd // mock the current working directory
unionfs // for mocking filesystem
memfs // for mocking filesystem
rewire // used in eleventy/utils/extensions test to mock private vars
ts-jest
ts-loader
```

## E2E Testing

```json
@playwright/test  // test runner for playwright. Bundles playwright with this package.
```

## Typescript used in client-side script

```json
@types/markdown-it
tslib
typescript
```

## Linting

```json
@types/eslint
@typescript-eslint/eslint-plugin`
@typescript-eslint/parser
eslint
eslint-config-prettier
eslint-import-resolver-typescript
eslint-plugin-import
eslint-plugin-jest-dom
eslint-plugin-jsdoc
eslint-plugin-jsx-a11y
eslint-plugin-no-null
eslint-plugin-node
eslint-plugin-prettier
prettier
stylelint
stylelint-a11y
stylelint-declaration-block-no-ignored-properties
stylelint-images
stylelint-order
stylelint-scss
```

## Client-side libraries

```json
focus-trap
lazysizes // for image lazyload
lodash
title-case // used in page title short code
```

## Pages in REMOVE directory dependencies

```json
@babel/plugin-transform-react-jsx
@babel/plugin-transform-runtime
@babel/preset-env
```

babel-loader
clean-css
cssesc
dompurify
encoding
focus-visible
infinite-scroll
memfs
preact
sanitize-html
twitter
