/*
- `self` works in browsers and web workers to get the global object
- `window` works in browsers to get the global object
- `global` works in Node to get the global object
*/

/*
`typeof globalThis`:

Defined by `lib` in `tsconfig`. Changing `lib` you can declare the expected environment and typescript will allow these features. You can use different values when you write code for browsers/NodeJS/WebWorker. But typescript doesn't check this environment, because it's runtime and not compile time.
*/

/*
A common use case for VM is to run the code in a different V8 Context. This means invoked code has a different global object than the invoking code. One can provide the context for the global object in the VM by contextifying an object. The invoked code treats any property in the context like a global variable. Any changes to global variables caused by the invoked code are reflected in the context object, so code ran in the VM can communicate back with calling script!
*/

/*
Reliably getting the global object, from around the time of the TC39 globalThis proposal.
The `function() { return this }` method breaks the Chrome App Content Security Policy so
isn't reliable.
*/
Object.prototype.__defineGetter__('__getValueOfThis__', function () {
  return this
})
const globalThisValue = __getValueOfThis__ // Invoke getter on "global object"
globalThisValue.globalThis = globalThisValue

/*
Here's an approach that checks to see if the global object refers to itself, and if it does
makes sure it has two expected properties that should be on the global object (Array and setInterval).
*/
const getGlobalObject = () => {
  if (
    typeof self !== 'undefined' &&
    self.self === self &&
    self.Array === Array &&
    self.setInterval === setInterval
  ) {
    return self
  }
  if (
    typeof window !== 'undefined' &&
    window.window === window &&
    window.Array === Array &&
    window.setInterval === setInterval
  ) {
    return window
  }
  if (
    typeof global !== 'undefined' &&
    global.global === global &&
    global.Array === Array &&
    global.setInterval === setInterval
  ) {
    return global
  }
  throw new Error('Cannot find the global object')
}

/*
Also saw idea of test like this:
*/
const isGlobal = global.Array === [].constructor &&
  global.RegExp === /a/g.constructor &&
  global.Number === (42).constructor &&
  global.String === ''.constructor &&
  global.Function === function () {}.constructor &&
  global.Object === {}.constructor

/*
Maybe:
*/
const global_env = (function () {
  /* global WorkerGlobalScope */ /* see https://github.com/sindresorhus/globals/issues/127 */
  if (typeof process !== 'undefined') {
    /* node */
    return global
  } else if (typeof window !== 'undefined') {
    /* browser window */
    return window
  } else if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
    /* web worker */
    return self
  } else {
    /* unknown global env */
    return (0, eval)('this') /* use non-strict mode to get global env */
  }
})()


const interesting = Object.prototype.isPrototypeOf(global) === true