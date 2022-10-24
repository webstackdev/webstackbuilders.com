/**
 * Tests for cookies modal
 */
import { resolve } from 'path'
import { describe, expect, test } from '@jest/globals'
import { getCurriedFixturePath, loadDomWithScript } from '../../../../../../test/jest/helpers'
//import * as listeners from '../listeners'

const getFixturePath = getCurriedFixturePath(__dirname)
const templatePath = resolve(process.cwd(), `src/_layouts/modals/cookies.njk`)

describe(``, () => {
  test(``, async () => {
    const scriptPath = getFixturePath(`listeners_1.ts`)
    await loadDomWithScript(templatePath, scriptPath, document)
    const body = document.querySelector(`body`)
    expect(body).toMatchInlineSnapshot()
  })
})
