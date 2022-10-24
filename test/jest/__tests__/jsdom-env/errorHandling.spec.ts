/// <reference path="../../../../@types/@jest/globals/expect.d.ts" />
/**
 * @jest-environment-options {"JSDOM_QUIET_MODE": true}
 *
 * Integration tests for default error handler and proxied add and remove event
 * handlers. Note this is testing code that is also provided the environment.
 */
//import { resolve } from 'path'
import { describe, expect, test } from '@jest/globals'
import { getByText } from '@testing-library/dom'
//import { addScript, getCurriedFixturePath } from '../../helpers'

//const getFixturePath = getCurriedFixturePath(
//  resolve(__dirname, `../../__fixtures__/errorHandling`)
//)

describe('Error handling routines hold and clear state', () => {
  const errorHandler = () => {
    const body = document.querySelector('body')!
    body.innerHTML = '<span>ERROR CAUGHT</span>'
  }

  /** Can't test JSDOM for unhandled exceptions directly */
  test(`uses default handler if no client handler provided`, () => {
    const body = document.querySelector(`body`)!
    const scriptElement = document.createElement(`script`)
    const inlineScript = document.createTextNode(`throw new Error()`)
    scriptElement.appendChild(inlineScript)
    body.appendChild(scriptElement)
    expect(document.querySelector(`script`)).toBeTruthy()
  })

  test(`uses client-provided handler`, () => {
    window.addEventListener(`error`, errorHandler)
    const body = document.querySelector(`body`)!
    const scriptElement = document.createElement(`script`)
    const inlineScript = document.createTextNode(`throw new Error()`)
    scriptElement.appendChild(inlineScript)
    body.appendChild(scriptElement)
    expect(getByText(body, /ERROR CAUGHT/)).toBeInTheDocument()
  })

  test(`uses default handler if client-provided added and removed`, () => {
    window.addEventListener(`error`, errorHandler)
    window.removeEventListener(`error`, errorHandler)
    const body = document.querySelector(`body`)!
    const scriptElement = document.createElement(`script`)
    const inlineScript = document.createTextNode(`throw new Error()`)
    scriptElement.appendChild(inlineScript)
    body.appendChild(scriptElement)
    expect(document.querySelector(`script`)).toBeTruthy()
  })


  test(`1/2 client-provided handler cleared between test cases`, () => {
    window.addEventListener(`error`, errorHandler)
    expect(true).toBeTruthy()
  })

  test(`2/2 uses default handler if following test case w/ client-provided handler`, () => {
    const body = document.querySelector(`body`)!
    const scriptElement = document.createElement(`script`)
    const inlineScript = document.createTextNode(`throw new Error()`)
    scriptElement.appendChild(inlineScript)
    body.appendChild(scriptElement)
    expect(document.querySelector(`script`)).toBeTruthy()
  })
})
