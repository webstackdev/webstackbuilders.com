const { addEleventyPlugins, disabled, enabled } = require('./plugins')

describe('Dynamic plugin loader works', () => {
  test('Calls addPlugin for enabled plugins with options objects', () => {
    const mockAddPlugin = jest.fn(() => {})
    const eleventyConfig = {
      addPlugin: mockAddPlugin,
    }
    const pluginSettings = { 'eleventy-favicon': enabled }

    addEleventyPlugins(eleventyConfig, pluginSettings)

    expect(mockAddPlugin.mock.calls.length).toBe(1)
    expect(mockAddPlugin).toHaveBeenCalledWith('eleventy-favicon')
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
