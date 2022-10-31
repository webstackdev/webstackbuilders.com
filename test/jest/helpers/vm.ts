import { NodeVM, VMScript } from 'vm2'
import { readFileSync } from 'fs'
/*import {
  clearTimeout as nodeClearTimeout,
  clearImmediate as nodeClearImmediate,
  clearInterval as nodeClearInterval,
  setTimeout as nodeSetTimeout,
  setImmediate as nodeSetImmediate,
  setInterval as nodeSetInterval,
} from 'timers'*/

/**
 * Code is compiled automatically the first time it is run by `VMScript`. Code can be
 * compiled on demand with `script.compile()`. Once the code is compiled, the method
 * has no effect.
 */
const getVMScript = (workerPath: string) => {
  const scriptContents = readFileSync(workerPath).toString()
  return new VMScript(scriptContents, workerPath)
}

// @TODO: This still doesn't work for swapping out global timer functions with real ones for fake ones, because vm2 sets the VM context with no option to intervene for those globals and pulls them from the current context (including faked timers if they're in use). So this has to be refactored / solved in one of three ways:
// 1. Make sure fake timers aren't in use in the test when calling tsCompile or loadHtmlTemplate
// 2. Refactor to use worker threads, attach the machinery to a global like the add/remove event handlers are done, and create a single worker instance for all tests in jest setup. Has the problem of doing that either in test environment (lots of threads created, one per test) or maybe starving tests running in parallel for access to the worker.
// 3. Refactor to use Node 'vm' module directly instead of through 'vm2'. VM2 uses a 'bridge' between the virtual container and main code to communicate back and forth, which native 'vm' lacks. Also I couldn't get any of the native 'vm' code examples to work in TypeScript, very few articles and guidance on doing it. Plus there's a performance cost for spawning the VM shell - maybe should investigate how big an impact it is.
// See notes in files with -VM-INFO suffix

export const vmInstance = async (dataPath: string, workerPath: string) => {
  const vm = new NodeVM({
    console: 'inherit',
    sandbox: {
      //myVar: 42, // available as global.myVar in container
      /*process,
      clearTimeout: nodeClearTimeout,
      clearImmediate: nodeClearImmediate,
      clearInterval: nodeClearInterval,
      setTimeout: nodeSetTimeout,
      setImmediate: nodeSetImmediate,
      setInterval: nodeSetInterval,*/
    }, // global object in sandbox
    require: {
      external: true,
      builtin: ['*'],
      root: './',
    },
    sourceExtensions: ['js', 'ts'],
  })

  try {
    const script = getVMScript(workerPath)
    const functionInSandbox = vm.run(script as VMScript)
    const result = await functionInSandbox(dataPath)
    return result
  } catch (err) {
    console.error('Failed to execute script in VM helper.', err)
  }

  process.on('uncaughtException', (err: unknown) => {
    console.error('Asynchronous error caught in VM helper.', err)
  })
}

export const loadHtmlTemplate = async (templatePath: string) => {
  const workerPath = `${__dirname}/workers/loadHtmlTemplate.js`
  return vmInstance(templatePath, workerPath)
}
export const tsCompile = async (entryFile: string) => {
  const workerPath = `${__dirname}/workers/compileTs.js`
  return vmInstance(entryFile, workerPath)
}
