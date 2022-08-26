/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Types for Eleventy config files
 */
type ServeStaticOptions = import('serve-static').ServeStaticOptions

interface Dict<T = unknown> {
  [key: string]: T | undefined
}

 
type AnyFunction<T = any> = (...args: any[]) => T

interface BrowserSyncConfig {
  /**
   * Browsersync includes a user-interface that is accessed via a separate port.
   * The UI allows to controls all devices, push sync updates and much more.
   */
  ui?:
    | false
    | {
        port: number
        weinre?: {
          port: number
        }
      }

  files?:
    | string
    | Array<
        | string
        | {
            match?: string[]
            fn?: (event: unknown, file: string) => unknown
          }
      >
    | false

  watchEvents?: string[]
  watch?: boolean
  ignore?: string[]
  single?: boolean
  watchOptions?: {
    ignoreInitial?: boolean
    ignored?: boolean
  }
  server?:
    | boolean
    | string
    | string[]
    | {
        baseDir?: string
        directory?: boolean
        serveStaticOptions?: ServeStaticOptions
        routes?: Dict<string>
      }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  proxy?:
    | string
    | boolean
    | {
        target?: string
        ws?: boolean
        middleware?: any
        reqHeaders?: string[]
        proxyReq?: any
        proxyRes?: any
      }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

type Empty = { isEmpty: true; empty: string } | { isEmpty: false }

type GrayMatter = {
  content: string
  excerpt?: string
  orig: Buffer
  language: string
  matter: string
  stringify(): string
} & Empty

type Engine = (input: string) => GrayMatter

type EngineName =
  | 'html'
  | 'md'
  | 'js'
  | '11ty.js'
  | 'liquid'
  | 'njk'
  | 'hbs'
  | 'mustache'
  | 'ejs'
  | 'haml'
  | 'pug'
  | 'jstl'

interface Page {
  /** The full path to the source input file (including the path to the input directory) */
  inputPath: string
  /** Mapped from the input file name, useful for permalinks. */
  fileSlug: string
  /** The full path to the output file to be written for this content */
  outputPath: string
  /** URL used to link to this piece of content. */
  url: string
  /** The resolved date used for sorting. */
  date: string | Date
}

interface Data {
  collections: {
    [key: string]: Item[] | undefined
  }
}

/** An `Item` is just like a `Page`, but with the actual data from render available. */
interface Item extends Page {
  /** all data for this piece of content (includes any data inherited from layouts) */
  data?: Data

  /** the rendered content of this template. This does *not• include layout wrappers */
  templateContent: string
}

interface Collection {
  /** Returns an array */
  getAll(): Item[]

  /**
   * Gets all collection items using the default sorting algorithm: ascending by
   * date, with the filename as tiebreaker. Can pipe to `reverse()` to get descending
   * dir, date, and filename: collectionApi.getAllSorted().reverse()
   *
   * Note that while Array `.reverse()` mutates the array in-place, all Eleventy
   * Collection API methods return new copies of collection arrays and can be
   * modified without side effects to other collections. However, you do need to
   * be careful when using Array `.reverse()` in templates.
   */
  getAllSorted(): Item[]

  /**
   * Returns an array of items matching the tag name.
   *
   * @param tagName - The name of the tag, usually set in front matter
   */
  getFilteredByTag(tagName: string): Item[]

  /**
   * Retrieve content that includes all of the tags passed in. Returns an array of items.
   *
   * @param tagNames - Arbitrary number of string parameters containing tag names
   *
   * Usage: collectionApi.getFilteredByTags("post", "travel", "photo")
   */
  getFilteredByTags(...tagNames: string[]): Item[]

  /**
   * Will match an arbitrary glob or an array of globs against the input file full
   * `inputPath`, including the input directory. Returns an array of items.
   *
   * @param glob - Single glob or array of globs
   */
  getFilteredByGlob(glob: string | string[]): Item[]
}

interface Renderer {
  render(input: string): string
}

/**
 * Used in `.eleventy.js` for typing the Eleventy Config
 */
export interface Config {
  dir?: {
    /**
     * Controls the top level directory/file/glob that will be used to look for
     * templates. Defaults to current directory: `.`
     */
    input?: string

    /**
     * Controls the directory inside which the finished templates will be written
     * to. Defaults to `_site`.
     */
    output?: string

    /**
     * The includes directory is meant for Eleventy layouts, include files, extends
     * files, partials, or macros. These files will not be processed as full template
     * files, but can be consumed by other templates. This value is relative to your
     * input directory. Defaults to `_includes`.
     */
    includes?: string

    /**
     * This configuration option allows Eleventy layouts to live outside of the
     * Includes directory. Just like the Includes directory, these files will not
     * be processed as full template files, but can be consumed by other templates.
     *
     * Note: This setting only applies to Eleventy's language-agnostic layouts when
     * defined in front matter or data files. When using `{% extends %}`, Eleventy
     * will still search the `_includes` directory. This value is relative to your
     * input directory. Defaults to value set in `dir.includes`.
     */
    layouts?: string

    /**
     * Controls the directory inside which the global data template files,
     * available to all templates, can be found. Defaults to `_data`.
     */
    data?: string
  }

  /**
   * The `data.dir` global data files are run through this template engine before
   * transforming to JSON. Defaults to `false`.
   */
  dataTemplateEngine?: EngineName | false

  /**
   * Markdown files are run through this template engine before transforming to HTML.
   * Defaults to `liquid`.
   */
  markdownTemplateEngine?: EngineName | false

  /**
   * HTML templates run through this template engine before transforming to better
   * HTML. Defaults to `liquid`.
   */
  htmlTemplateEngine?: EngineName | false

  /**
   * Specify which types of templates should be transformed.
   * Default is `html,liquid,ejs,md,hbs,mustache,haml,pug,njk,11ty.js`.
   */
  templateFormats?: EngineName[]

  /**
   * If your site lives in a different subdirectory, particularly useful with GitHub
   * pages, use `pathPrefix` to specify this. It is used by the `url` filter and inserted
   * at the beginning of all absolute url href links. It does not affect your file structure.
   * Leading or trailing slashes are normalized away. Default is `/`.
   */
  pathPrefix?: string

  /**
   * If an HTML template has (1) the same input and output directories and (2) is named
   * `index.html`, files will have this suffix added to their output filename to prevent
   * overwriting the template. Default is `-o`.
   */
  htmlOutputSuffx?: string

  /**
   * When using Template and Directory Specific Data Files, to prevent file name conflicts
   * with non-Eleventy files in the project directory, we scope these files with a
   * unique-to-Eleventy suffix. This key is customizable using `jsDataFileSuffix`. For
   * example, the default `.11tydata` for this value will search for `*.11tydata.js`
   * and `*.11tydata.json` data files.
   */
  jsDataFileSuffix?: string

  /**
   * Global data can be added to the Eleventy config object using the `addGlobalData`
   * method. This is especially useful for plugins. The first value of `addGlobalData`
   * is the key that will be available to your templates and the second value is the
   * value of the value returned to the template.
   *
   * @param name - The namespace that this global data should be keyed to
   * @param data - A function that returns an object of key/values holding the global data to add
   */
  addGlobalData(name: string, data: () => { [key: string]: any }): Config

  /**
   * The `addWatchTarget` config method allows you to manually add a file or directory
   * for Eleventy to watch. When the file or the files in this directory change Eleventy
   * will trigger a build. This is useful if Eleventy is not directly aware of any
   * external file dependencies.
   *
   * @param path - Glob of the directory to watch, relative to the config.
   */
  addWatchTarget(path: string): void

  /**
   * Add custom collection
   *
   * @param name - Name for the collection, also tags are used for collection names
   * @param builder - Callback that can return any arbitrary object type and it will be available as data in the template, can be async.
   */
  addCollection(
    name: string,
    builder: (
      collection: Collection
    ) => Page[] | Record<string, unknown> | Promise<Record<string, unknown>>
  ): void

  /**
   *
   * @param name - Name of the filter to add
   * @param filter - The filter function to add
   */
  addFilter(name: string, filter: AnyFunction): void

  /**
   * Transforms can modify template output. For example, use a transform to
   * format/prettify an HTML file with proper whitespace. The provided transform
   * function must return the original or transformed content.
   */
  addTransform(
    name: string,
    transform: (content: string, outputPath: string) => string | Promise<string>
  ): string

  /**
   * Linters are provided to analyze template output without modifying it.
   */
  addLinter(
    name: string,
    linter: (content: string, inputPath: string, outputPath: string) => void | Promise<void>
  ): void

  addShortcode(name: string, shortcode: AnyFunction<string>): string
  addLiquidShortcode(name: string, shortcode: AnyFunction<string>): void
  addNunjucksShortcode(name: string, shortcode: AnyFunction<string>): void
  addHandlebarsShortcode(name: string, shortcode: AnyFunction<string>): void
  addJavascriptShortcode(name: string, shortcode: AnyFunction<string>): void
  addPairedShortcode(name: string, shortcode: <A>(content: string, ...args: A[]) => string): void

  /**
   * A JavaScript Template Function allows you to extend your JavaScript templates
   * with extra functionality. If you add any Universal Filters or Shortcodes, they
   * will be exposed as JavaScript Template Functions.
   */
  addJavaScriptFunction(name: string, fn: AnyFunction<string>): void

  addLiquidFilter(name: string, filter: <A>(...args: A[]) => unknown): Record<string, unknown>
  addNunjucksFilter(name: string, filter: <A>(...args: A[]) => unknown): void
  addNunjucksAsyncFilter(
    name: string,
    filter: <T>(value: T, callback: <E, R>(err: E | null, res: R) => unknown) => void
  ): void
  addNunjucksAsyncFilter(
    name: string,
    filter: <T, U>(value1: T, value2: U, callback: <E, R>(err: E | null, res: R) => unknown) => void
  ): void
  addNunjucksAsyncFilter(
    name: string,
    filter: <T, U, V>(
      value1: T,
      value2: U,
      value3: V,
      callback: <E, R>(err: E | null, res: R) => unknown
    ) => void
  ): void

  /**
   * Handlebars specific helpers to transform or modify content. If you return HTML in
   * your Handlebars helper, you need to use the Handlebars triple-stash syntax (three
   * opening and three closing curly brackets) to avoid double-escaped HTML.
   */
  addHandlebarsHelper(name: string, helper: AnyFunction<string>): Record<string, unknown>

  /**
   * Plugins are custom code that Eleventy can import into a project from an external
   * repository.
   *
   * @param fn - The plugin to include.
   * @param config - Customize plugin behavior. These options are specific to the plugin.
   */
  addPlugin<F extends AnyFunction>(fn: F, config?: Parameters<F>[0]): void

  /**
   * Searching the entire directory structure for files to copy based on file extensions
   * is not optimal with large directory structures. If we know what non-template static
   * content we want to appear in our output, we can opt-in to specify files or directories
   * for Eleventy to copy. This will probably speed up your build times. These entries are
   * relative to the root of your project and not your Eleventy input directory.
   *
   * @param path - The file path to copy, either an individual file or directory.
   */
  addPassthroughCopy(path: string): void
  addPassthroughCopy(mapping: Record<string, string>): void

  /**
   * You can namespace parts of your configuration using `eleventyConfig.namespace`.
   * This will add a string prefix to all filters, tags, helpers, shortcodes,
   * collections, and transforms.
   *
   * @param withName - The string prefix to apply to the items.
   * @param context - A callback in which to add your namespaced items.
   */
  namespace(withName: string, context: () => void): void

  /**
   * Add additional supported template formats for Eleventy to source
   */
  setTemplateFormats(to: EngineName[]): void

  /**
   * Opts in to a full deep merge when combining the Data Cascade. This will use
   * something like `lodash.mergewith` to combine Arrays and deep merge Objects, rather
   * than a simple top-level merge using Object.assign. Read more at [Issue #147][147].
   * This will likely become the default in an upcoming major version.
   *
   * [147]: https://github.com/11ty/eleventy/issues/147
   *
   * Note that all data stored in the `pagination` variable is exempted from this
   * behavior (we do not want `pagination.items` to be merged together).
   *
   * @param to - `true` to enable deep merge, `false` (the current default) to opt out.
   */
  setDataDeepMerge(to: boolean): void

  /**
   * When in --watch mode, Eleventy will spider the dependencies of your JavaScript
   * Templates, JavaScript Data Files, and Configuration File to watch those files
   * too. Files in node_modules directories are ignored.
   *
   * @param to - Whether dependencies should be spidered
   */
  setWatchJavaScriptDependencies(to: boolean): void

  /**
   * Use the 404 error page on dev server, Netlify picks it up automatically in production with a redirect
   */
  setBrowserSyncConfig(to: BrowserSyncConfig): void

  /**
   * The options object is passed straight through to gray-matter as gray matter options
   */
  setFrontMatterParsingOptions(to: {
    excerpt?: boolean
    excerpt_separator?: string
    excerpt_alias?: string
    engines?: Dict<Engine>
  }): void

  /**
   * Configured markdown-it instance, also used in markdown shortcodes
   */
  setLibrary(to: EngineName, using: Renderer): void

  /**
   * Use `.eleventyignore` for dev server files to watch instead of default `.gitignore`
   */
  setUseGitIgnore(enabled: boolean): void
}
