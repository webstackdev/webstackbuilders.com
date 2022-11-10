const { addEleventyPlugins, disabled, enabled } = require('../plugins')
const { mergeConfig } = require('../__fixtures__/TemplateConfig')

describe('Dynamic plugin loader works', () => {
  test('Calls addPlugin for enabled plugins with options objects', () => {
    const mockAddPlugin = jest.fn(() => {})
    const eleventyConfig = {
      addPlugin: mockAddPlugin,
    }
    const pluginSettings = { 'eleventy-favicon': enabled }

    addEleventyPlugins(eleventyConfig, pluginSettings)

    expect(mockAddPlugin.mock.calls).toHaveLength(1)
    const firstMockParam = mockAddPlugin.mock.calls[0][1]
    expect(firstMockParam && typeof firstMockParam === 'object').toBe(true)
    const secondMockParam = mockAddPlugin.mock.calls[0][1]
    expect(secondMockParam && typeof secondMockParam === 'object').toBe(true)
   })

  test('Throws if plugin is not valid', () => {
    const eleventyConfig = {
      addPlugin: () => {},
    }
    const pluginSettings = { 'not-a-real-plugin': enabled }

    expect(() => addEleventyPlugins(eleventyConfig, pluginSettings)).toThrow()
  })

  test('Does nothing if plugin is not enabled', () => {
    const mockAddPlugin = jest.fn(() => {})
    const eleventyConfig = {
      addPlugin: mockAddPlugin,
    }
    const pluginSettings = { 'eleventy-favicon': disabled }

    addEleventyPlugins(eleventyConfig, pluginSettings)

    expect(mockAddPlugin).not.toHaveBeenCalled()
  })
})

describe('Integration of dynamic plugin adder with Eleventy config merge function works', () => {
  test('Eleventy merge function works with project config returns config object', () => {
    expect(mergeConfig()).toBeInstanceOf(Object)
  })
})
