/**
 * Tests for custom matchers
 */
import { describe, expect, test } from '@jest/globals'
import { inProtoChain, toHaveInProtoChain } from '../matchers'

describe(`toHaveInProtoChain works`, () => {
  test(`inProtoChain returns true for child class`, () => {
    class ParentClass {}
    class ChildClass extends ParentClass {}
    const sut = inProtoChain(ChildClass, ParentClass)
    expect(sut).toBeTruthy()
  })

  test(`inProtoChain returns true for grandchild class`, () => {
    class ParentClass {}
    class ChildClass extends ParentClass {}
    class GrandchildClass extends ChildClass {}
    const sut = inProtoChain(GrandchildClass, ParentClass)
    expect(sut).toBeTruthy()
  })

  test(`inProtoChain returns false for child class in parent class prototype chain`, () => {
    class ParentClass {}
    class ChildClass extends ParentClass {}
    const sut = inProtoChain(ParentClass, ChildClass)
    expect(sut).toBeFalsy()
  })

  test(`inProtoChain returns false for unrelated classes`, () => {
    class ClassOne {}
    class ClassTwo {}
    const sut = inProtoChain(ClassOne, ClassTwo)
    expect(sut).toBeFalsy()
  })

  test(`toHaveInProtoChain checks full chain`, () => {
    class ParentClass {}
    class ChildClass extends ParentClass {}
    class GrandchildClass extends ChildClass {}

    const sut = toHaveInProtoChain(GrandchildClass, ParentClass, ChildClass)

    expect(sut).toMatchObject({ pass: true })
    expect(sut.message()).toEqual(expect.stringContaining(`not`))
  })

  test(`toHaveInProtoChain returns false for unrelated classes`, () => {
    class ClassOne {}
    class ClassTwo {}

    const sut = toHaveInProtoChain(ClassOne, ClassTwo)

    expect(sut).toMatchObject({ pass: false })
    expect(sut.message()).toEqual(expect.not.stringContaining(`not`))
  })
})
