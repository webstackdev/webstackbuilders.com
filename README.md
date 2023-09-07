# Webstack Builders Corporate Website using Eleventy

## Tags

Allowable tags are defined in `src/_data/tagList.js`. The `exceptions` key is used in `eleventy/nunjucksShortcodes/normalizeTagName.js`, and the list itself is used in `scripts/validateFrontmatter/schemas/eleventy.ts`.

## CLI Envs

## Haven't added yarn plugins to launch tasks from yarn CLI yet, so use this syntax:

```bash
clear && TS_NODE_PROJECT="tsconfig.gulp.json" yarn gulp build
```

## Run a single test:

```bash
clear && TS_NODE_PROJECT="tsconfig.jest.json" yarn jest eleventy/nunjucksAsyncShortcodes/asyncImageHandler/utils.spec.js --projects test/jest/jest.config.node.ts
```

## Snippet to search for string in project with exclude directories:

```bash
clear && egrep -rnw './' --exclude-dir=node_modules --exclude-dir=.yarn --exclude-dir=yarn.lock --exclude-dir=public --exclude-dir=.cache -e 'searchString'
```

## Clear Jest's cache:

```bash
npx jest --clearCache
```

## For install errors that report error installing sharp, recommended install. See `jest.setup.jsdom.ts`:

```bash
npm install --platform=linux --arch=x64 sharp
```

## Check if a CSS selector is valid in the browser console:

```bash
document.querySelector('.contact___callout-flex')
```

## Test the value of a CSS variable when using `calc()` in the browser console:

```bash
document.getElementById('header__theme-icon').getBoundingClientRect().width
```

## Get the currently focused element on the page in the console:

```bash
document.activeElement
```

## Testing HTML with `html-validate` in Braid UI:

```typescript
import '@testing-library/jest-dom';
import 'html-validate/jest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BraidTestProvider } from '../../../entries/test';
import { Button, IconSend } from '..';

describe('Button', () => {
  it('should render valid html structure', () => {
    expect(
      renderToStaticMarkup(
        <BraidTestProvider>
          <Button>Button</Button>
          <Button icon={<IconSend />}>Button</Button>
        </BraidTestProvider>,
      ),
    ).toHTMLValidate({
      extends: ['html-validate:recommended'],
    });
  });
});
```
