import { describe, expect, test } from '@jest/globals'

/**
 * Tests for slugify regex
 */
import { slugRegex } from './slugRegex'

describe('Slug regex for front matter validation', () => {
  test('should pass with valid slug', () => {
    const testRoute = `home-page`
    const sut = slugRegex.exec(testRoute)
    expect(sut).toBeTruthy()
  })

  test('should fail with slug containing invalid punctuation', () => {
    const testRoute = `Home_Page`
    const sut = slugRegex.exec(testRoute)
    expect(sut).toBeFalsy()
  })
})
