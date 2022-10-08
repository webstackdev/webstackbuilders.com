const { vol } = require('memfs')
const { bsMiddlewareCallback, exists404 } = require('./pageNotFoundHandler')

// @TODO: need to monkey patch `require` and use a memory fs so this isn't relying on the production build output
describe.skip(`Checks if 404.html exists`, () => {
  test(`Does not throw if 404.html file exists`, () => {
    expect(() => exists404()).not.toThrow()
  })

  test(`Throws if 404.html file does not exist`, () => {
    expect(() => exists404()).toThrow()
  })
})

describe(`Page not found handler works`, () => {
  test(`Callback writes the error page to response`, () => {
    const mockResponse = () => {
      const res = {}
      res.writeHead = jest.fn().mockReturnValue(res)
      res.write = jest.fn().mockReturnValue(res)
      res.end = jest.fn().mockReturnValue(res)
      return res
    }
    const res = mockResponse()
    bsMiddlewareCallback(undefined, res)
    expect(res.writeHead).toHaveBeenCalledWith(404, {"Content-Type": "text/html; charset=UTF-8"})
    expect(res.write).toHaveBeenCalledWith(expect.any(Object))
    expect(res.end).toHaveBeenCalled()
  })
})
