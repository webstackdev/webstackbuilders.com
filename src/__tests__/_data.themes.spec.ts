/// <reference path="../../@types/sass-extract.d.ts" />
/**
 * Tests for theme data provider
 */
import { describe, expect, test } from '@jest/globals'
import { renderSync } from 'sass-extract'
//import Themes from '../_data/themes'

/**
 * @NOTE: See `src/assets/scss/variables/_themes.scss` and `src/assets/scss/utils/_themes.scss`
 * @TODO: Getting errors with the sass-extract renderSync method in script, but works in SCSS compile
 */

describe(`Themes`, () => {
  test.skip(`Vars`, () => {
    const vars = renderSync({
      file: 'src/assets/scss/utils/_themes.scss',
      includePaths: ['src/assets/scss/variables/_colors.scss'],
    })
    expect(vars).toMatchInlineSnapshot()
  })
})
