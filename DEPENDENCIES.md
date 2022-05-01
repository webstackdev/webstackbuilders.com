# Dependencies

This is to document where dependencies are used so unused dependencies can be removed

```bash
egrep -rnw --exclude-dir=node_modules --exclude=yarn.lock --exclude=yarn-error.log '.' -e 'yargs'
```

## Build and package.json

```json
critical
cross-env
html-minifier // used in handler
np // a better npm publish, used in package.json script
npm-run-all
sass
serve
terser
terser-webpack-plugin
webpack
webpack-cli
webpack-merge
```

## Cache busting script in _data

```json
md5-file
```

## npm-package-scripts

```json
yargs
```

## Used in Gulpfile

```json
cssnano
del
fancy-log
gulp
gulp-postcss
gulp-sass
gulp-sourcemaps
mkdirp // peer dependency
postcss-preset-env
postcss-svgo
```

## Eleventy plugins and config

```json
@11ty/eleventy
@11ty/eleventy-img
@11ty/eleventy-plugin-directory-output
@11ty/eleventy-plugin-inclusive-language
@11ty/eleventy-navigation
@11ty/eleventy-plugin-rss
@11ty/eleventy-plugin-syntaxhighlight
@11tyrocks/eleventy-plugin-social-images
eleventy-plugin-lazyimages
luxon // date-time lib used in filters
markdown-it
markdown-it-anchor
markdown-it-emoji
outdent
postcss
```

## Testing

```json
@babel/core
@babel/preset-typescript
@types/jest
babel-jest
cypress
jest
jsdom
ts-jest
ts-loader
```

## Typescript used in client-side script

```json
@types/markdown-it // still used?
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

## MBX Dependencies

@11ty/eleventy-navigation
@babel/plugin-transform-react-jsx
@babel/plugin-transform-runtime
@babel/preset-env
babel-loader
clean-css
cssesc
dompurify
dotenv
eleventy-plugin-page-assets
eleventy-plugin-share-highlight
focus-trap
focus-visible
html-entities
html-minifier
infinite-scroll
lodash
memfs
preact
sanitize-html
svg-sprite
twitter
workbox-cli
encoding
netlify-lambda
