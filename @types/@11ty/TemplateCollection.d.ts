declare module '@11ty/eleventy/TemplateCollection' {
  interface Item {
    checkTemplateContent: boolean
    data: unknown
    date: Date
    filePathStem: string
    fileSlug: string
    inputPath: string
    outputPath: string
    template: unknown
    templateContent: unknown
    url: string
  }

  type sortFunction<T> = (a: T, b: T) => number

  /**
   * Collections
   */
  class Sortable {
    isSortAscending: boolean
    isSortNumeric: boolean
    items: Item[]
    _dirty: boolean
    _filteredByGlobsCache: Map<unknown, unknown>

    sortFunctionStringMap: Record<string, string>

    get length(): number
    add(item: Item): void
    sort(compareFn: sortFunction<Item>): Item[]
    sortAscending(): Item[]
    sortDescending(): Item[]
    setSortDescending(): void
    setSortAscending(isAscending: boolean): void
    setSortNumeric(isNumeric: boolean): void
    static sortFunctionNumericAscending(a: number, b: number): number
    static sortFunctionNumericDescending(a: number, b: number): number
    static sortFunctionAscending(a: unknown, b: unknown): number
    static sortFunctionDescending(a: unknown, b: unknown): number
    static sortFunctionAlphabeticAscending(a: string, b: string): number
    static sortFunctionAlphabeticDescending(a: string, b: string): number
    static sortFunctionDate(mapA: Map<unknown, unknown>, mapB: Map<unknown, unknown>): number
    static sortFunctionDateInputPath(
      mapA: Map<unknown, unknown>,
      mapB: Map<unknown, unknown>
    ): number
    getSortFunction(): sortFunction<unknown>
    getSortFunctionAscending(): sortFunction<number | string>
    getSortFunctionDescending(): sortFunction<number | string>
  }

  /**
   * Collections
   */
  class TemplateCollection extends Sortable {
    _filteredByGlobsCache: Map<unknown, unknown>
    getAll(): Item[]
    getAllSorted(): Item[]
    getSortedByDate(): Item[]
    getGlobs(globs: string[]): string[]
    getFilteredByGlob(globs: string[]): Item[]
    getFilteredByTag(tagName: string): Item[]
    getFilteredByTags(tags: string[]): Item[]
  }

  export = TemplateCollection
}

/*

*/
