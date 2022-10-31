/*
See: https://github.com/sinonjs/fake-timers/blob/main/src/fake-timers-src.js
for implementation of jest.useRealTimers(), uninstall() method on line 850
*/

// jest-environment-node sets these in the start of environment:
this.context = createContext();
const global = runInContext(
  'this',
  Object.assign(this.context, projectConfig.testEnvironmentOptions),
) as Global.Global;
this.global = global;

// helper functions in jest-environment-node
// some globals we do not want, either because deprecated or we set it ourselves
const denyList = new Set([
  'GLOBAL',
  'root',
  'global',
  'Buffer',
  'ArrayBuffer',
  'Uint8Array',
  // if env is loaded within a jest test
  'jest-symbol-do-not-touch',
])

const nodeGlobals = new Map(
  Object.getOwnPropertyNames(globalThis)
    .filter(global => !denyList.has(global))
    .map(nodeGlobalsKey => {
      const descriptor = Object.getOwnPropertyDescriptor(globalThis, nodeGlobalsKey)

      if (!descriptor) {
        throw new Error(`No property descriptor for ${nodeGlobalsKey}, this is a bug in Jest.`)
      }

      return [nodeGlobalsKey, descriptor]
    })
)

// use of the above in jest-environment-node constructor:
const contextGlobals = new Set(Object.getOwnPropertyNames(global));

for (const [nodeGlobalsKey, descriptor] of nodeGlobals) {
  if (!contextGlobals.has(nodeGlobalsKey)) {
    Object.defineProperty(global, nodeGlobalsKey, {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      get() {
        // @ts-expect-error: no index signature
        const val = globalThis[nodeGlobalsKey] as unknown;

        // override lazy getter
        Object.defineProperty(global, nodeGlobalsKey, {
          configurable: descriptor.configurable,
          enumerable: descriptor.enumerable,
          value: val,
          writable: descriptor.writable,
        });
        return val;
      },
      set(val: unknown) {
        // override lazy getter
        Object.defineProperty(global, nodeGlobalsKey, {
          configurable: descriptor.configurable,
          enumerable: descriptor.enumerable,
          value: val,
          writable: true,
        });
      },
    });
  }
}

// Then:
// @ts-expect-error - Buffer and gc is "missing"
global.global = global;
global.Buffer = Buffer;
global.ArrayBuffer = ArrayBuffer;
// TextEncoder (global or via 'util') references a Uint8Array constructor
// different than the global one used by users in tests. This makes sure the
// same constructor is referenced by both.
global.Uint8Array = Uint8Array;

global.process = createProcessObject() // jest-util createProcessObject.ts

// Node's error-message stack size is limited at 10, but it's pretty useful
// to see more than that when a test fails.
global.Error.stackTraceLimit = 100;

/*
// Globals extracted by the nodeGlobals map:

Map(84) {
  'globalThis' => {
    value: <ref *1> Object [global] {
      global: [Circular *1],
      clearInterval: [Function: clearInterval],
      clearTimeout: [Function: clearTimeout],
      setInterval: [Function: setInterval],
      setTimeout: [Function],
      queueMicrotask: [Function: queueMicrotask],
      performance: [Performance [EventTarget]],
      clearImmediate: [Function: clearImmediate],
      setImmediate: [Function],
      structuredClone: [Function: structuredClone]
    },
  },
  'AbortController',
  'AbortSignal',
  'AggregateError',
  'Array',
  'Atomics',
  'BigInt',
  'BigInt64Array',
  'BigUint64Array',
  'Boolean',
  'DOMException',
  'DataView',
  'Date',
  'Error',
  'EvalError',
  'Event',
  'EventTarget',
  'FinalizationRegistry',
  'Float32Array',
  'Float64Array',
  'Function',
  'Infinity',
  'Int16Array',
  'Int32Array',
  'Int8Array',
  'Intl',
  'JSON',
  'Map',
  'Math',
  'MessageChannel',
  'MessageEvent',
  'MessagePort',
  'NaN',
  'Number',
  'Object',
  'Promise',
  'Proxy',
  'RangeError',
  'ReferenceError',
  'Reflect',
  'RegExp',
  'Set',
  'SharedArrayBuffer',
  'String',
  'Symbol',
  'SyntaxError',
  'TextDecoder',
  'TextEncoder',
  'TypeError',
  'URIError',
  'URL',
  'URLSearchParams',
  'Uint16Array',
  'Uint32Array',
  'Uint8ClampedArray',
  'WeakMap',
  'WeakRef',
  'WeakSet',
  'WebAssembly',
  'atob',
  'btoa',
  'clearImmediate',
  'clearInterval',
  'clearTimeout',
  'console',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'escape',
  'eval',
  'isFinite',
  'isNaN',
  'parseFloat',
  'parseInt',
  'performance',
  'process',
  'queueMicrotask',
  'setImmediate',
  'setInterval',
  'setTimeout',
  'structuredClone',
  'undefined',
  'unescape',
}
*/
