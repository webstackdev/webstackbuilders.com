//console.log(Object.prototype.isPrototypeOf(global))

const environment = new TestEnvironment() // JestEnvironment

import type {Global} from '@jest/types';

export default function setGlobal(
  globalToMutate: typeof globalThis | Global.Global,
  key: string,
  value: unknown,
): void {
  // @ts-expect-error: no index
  globalToMutate[key] = value;
}

setGlobal(environment.global, 'console', testConsole)

//  environment.global.process.exit is monkey-patched with real one cached

await environment.setup()

await tearDownEnv()

import {
  Script,
  // @ts-expect-error: experimental, not added to the types
  SourceTextModule,
  // @ts-expect-error: experimental, not added to the types
  SyntheticModule,
  Context as VMContext,
  // @ts-expect-error: experimental, not added to the types
  Module as VMModule,
} from 'vm';


private createScriptFromCode(scriptSource: string, filename: string) {
  try {
    const scriptFilename = this._resolver.isCoreModule(filename)
      ? `jest-nodejs-core-${filename}`
      : filename;
    return new Script(this.wrapCodeInModuleWrapper(scriptSource), {
      displayErrors: true,
      filename: scriptFilename,
      // @ts-expect-error: Experimental ESM API
      importModuleDynamically: async (specifier: string) => {
        invariant(
          runtimeSupportsVmModules,
          'You need to run with a version of node that supports ES Modules in the VM API. See https://jestjs.io/docs/ecmascript-modules',
        );

        const context = this._environment.getVmContext?.();

        invariant(context, 'Test environment has been torn down');

        const module = await this.resolveModule(
          specifier,
          scriptFilename,
          context,
        );

        return this.linkAndEvaluateModule(module);
      },
    });
  } catch (e: any) {
    throw handlePotentialSyntaxError(e);
  }
}

  private wrapCodeInModuleWrapper(content: string) {
    return `${this.constructModuleWrapperStart() + content}\n}});`;
  }

  private constructModuleWrapperStart() {
    const args = this.constructInjectedModuleParameters();

    return `({"${EVAL_RESULT_VARIABLE}":function(${args.join(',')}){`;
  }

  private constructInjectedModuleParameters(): Array<string> {
    return [
      'module',
      'exports',
      'require',
      '__dirname',
      '__filename',
      this._config.injectGlobals ? 'jest' : undefined,
      // ProjectConfig.sandboxInjectedGlobals
      // jest-environment: ...sandboxInjectedGlobals: Array<Global.Global[keyof Global.Global]>
      ...this._config.sandboxInjectedGlobals, // sandboxInjectedGlobals: ['Math']
    ].filter(notEmpty);
  }

  private async linkAndEvaluateModule(
    module: VMModule,
  ): Promise<VMModule | void> {
    if (this.isTornDown) {
      this._logFormattedReferenceError(
        'You are trying to `import` a file after the Jest environment has been torn down.',
      );
      process.exitCode = 1;
      return;
    }

    if (module.status === 'unlinked') {
      // since we might attempt to link the same module in parallel, stick the promise in a weak map so every call to
      // this method can await it
      this._esmModuleLinkingMap.set(
        module,
        module.link((specifier: string, referencingModule: VMModule) =>
          this.resolveModule(
            specifier,
            referencingModule.identifier,
            referencingModule.context,
          ),
        ),
      );
    }

    await this._esmModuleLinkingMap.get(module);

    if (module.status === 'linked') {
      await module.evaluate();
    }

    return module;
  }
