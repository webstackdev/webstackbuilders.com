import { resolve } from 'path'
import { loadHtmlTemplate } from '../loadHtmlTemplate'
import type { EleventyJson } from '../loadHtmlTemplate'

const templatePath = resolve(`test/jest/__fixtures__/loadHtmlTemplate.njk`)

describe('Loads a template file', () => {
  let json: EleventyJson
  beforeAll(async () => {
    json = await loadHtmlTemplate(templatePath)
  })

  test('should set to visible', () => {
    expect(json.content).toMatch(/test template/)
  })
})
