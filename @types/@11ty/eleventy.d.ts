/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@11ty/eleventy' {
  interface Options {
    /** The path to Eleventy's config file. */
    configPath?: string
    /** Function that's passed userConfig from eleventyConfig */
    config?: () => { [key: string]: any }
    /** Whether script is called from CLI or programmatically */
    source?: 'cli' | 'script'
    /** Whether Eleventy is running in verbose mode */
    quietMode?: boolean
    /** Explicit input directory, usually used when input is a single file/serverless */
    setInputDir?: string
  }

  /**
   * Runtime of eleventy.
   *
   * @param input - Where to read files from.
   * @param output - Where to write rendered files to.
   */
  class Eleventy {
    constructor(
      input?: string,
      output?: string,
      options?: { [key: string]: any },
      eleventyConfig?: import('../eleventyConfig').Config | null
    )
    getNewTimestamp(): number
    get input(): string
    get inputDir(): string
    setInputDir(dir: string): void
    get outputDir(): string
    /**
     * Updates the dry-run mode of Eleventy.
     *
     * @param isDryRun - Whether Eleventy should run in dry mode
     */
    setDryRun(isDryRun: boolean): void
    /**
     * Sets the incremental build mode.
     *
     * @param isIncremental - Whether Eleventy should run in incremental build mode and only write the files that trigger watch updates
     */
    setIncrementalBuild(isIncremental: boolean): void
    /**
     * Updates the passthrough mode of Eleventy.
     *
     * @param isPassthroughAll - Shall Eleventy passthrough everything?
     */
    setPassthroughAll(isPassthroughAll: boolean): void
    /**
     * Updates the path prefix used in the config.
     *
     * @param pathPrefix - The new path prefix.
     */
    setPathPrefix(pathPrefix: string): void
    /**
     * Updates the watch targets.
     * TODO: Improve type for watched targets object
     *
     * @param watchTargets - The new watch targets.
     */
    setWatchTargets(watchTargets: any)
    /**
     * Restarts Eleventy.
     */
    restart(): Promise<void>
    /**
     * Logs some statistics after a complete run of Eleventy.
     *
     * @returns - The log message.
     */
    logFinished(): string
    /**
     * Starts Eleventy.
     */
    init(): Promise<any>
    /** Return env vars set as initial global data under eleventy.env.* */
    getEnvironmentVariableValues(): {
      /** Absolute path to config */
      config: string
      /** Path to config without filename */
      root: string
      source: Pick<Options, 'source'>
    }
    /** Set process.ENV variables for use in Eleventy projects */
    initializeEnvironmentVariables(env: { root: string }): void
    /* Getter for verbose mode */
    get verboseMode(): boolean
    /* Setter for verbose mode */
    set verboseMode(value: boolean)
    /* Getter for Logger */
    get logger(): (mssg: string) => void
    /* Setter for Logger */
    set logger(logger: (mssg: string) => void)
    disableLogger(): void
    get errorHandler(): (err: string | Error) => void
    /**
     * Updates the verbose mode of Eleventy.
     *
     * @param isVerbose - Whether Eleventy should run in verbose mode
     */
    setIsVerbose(isVerbose: boolean): void
    /**
     * Updates the template formats of Eleventy.
     *
     * @param formats - The new template formats.
     */
    setFormats(formats: string): void
    /**
     * Reads the version of Eleventy.
     */
    static getVersion(): string
    /**
     * Shows a help message including usage.
     *
     * @returns - The help mesage.
     */
    static getHelp(): string
    /** Resets the config of Eleventy. */
    resetConfig(): void
    /**
     * Set up watchers and benchmarks.
     */
    initWatch(): Promise<void>
    /**
     * Returns all watched files.
     * TODO: Improve type for watched file object
     *
     * @returns The watched files.
     */
    getWatchedFiles(): Promise<any>
    /** TODO: Improve type for watched file object */
    getChokidarConfig(): any
    /**
     * Start the watching of files.
     */
    watch(): Promise<void>
    /** Exits process */
    stopWatch(): void

    /**
     * Serve Eleventy on this port.
     *
     * @param port - The HTTP port to serve Eleventy from.
     */
    serve(port: number): void

    /**
     * Writes templates to the file system.
     */
    write(): Promise<void>
    /**
     * Renders templates to a JSON object.
     */
    toJSON(): Promise<void>

    /**
     * Returns a stream of new line delimited (NDJSON) objects
     */
    toNDJSON(): Promise<void>

    /**
     * tbd.
     *
     * @param to - Default is 'fs'
     */
    executeBuild(to?: string): Promise<void>
  }
  namespace Eleventy {}
  export = Eleventy
}
