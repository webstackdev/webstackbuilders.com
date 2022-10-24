import type { Constructor } from '../../../test/jest/matchers/assertions'

declare module 'expect' {
  export interface Matchers<R> {
    /**
     * Custom Jest matchers
     */
    toHaveInProtoChain(...chain: Constructor[]): R
    /**
     * Type definitions for jest-extended matchers, copy-pasted individually into project.
     * https://github.com/jest-community/jest-extended/blob/main/types/index.d.ts
     */
    toBeBoolean(): R
    toBeTrue(): R
    toBeFalse(): R
    toBeDate(): R
    toBeValidDate(): R
    toBeFunction(): R
    toBeDateString()
    toBeNil(): R
    toBeObject(): R

    /**
     * DefinitelyTyped definitions for @testing-library/jest-dom use
     * deprecated global declaration and are non-working in current config
     */
    toBeInTheDOM(container?: HTMLElement | SVGElement): R
    toBeInTheDocument(): R
    toBeVisible(): R
    toBeEmpty(): R
    toBeEmptyDOMElement(): R
    toBeDisabled(): R
    toBeEnabled(): R
    toBeInvalid(): R
    toBeRequired(): R
    toBeValid(): R
    toContainElement(element: HTMLElement | SVGElement | null): R
    toContainHTML(htmlText: string): R
    toHaveAttribute(attr: string, value?: unknown): R
    toHaveClass(...classNames: string[]): R
    toHaveClass(classNames: string, options?: { exact: boolean }): R
    toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): R
    toHaveFocus(): R
    toHaveFormValues(expectedValues: Record<string, unknown>): R
    toHaveStyle(css: string | Record<string, unknown>): R
    toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R
    toHaveValue(value?: string | string[] | number | null): R
    toBeChecked(): R
    toHaveAccessibleDescription(text?: string | RegExp): R
    toHaveAccessibleName(text?: string | RegExp): R
    toBePartiallyChecked(): R
    toHaveErrorMessage(text?: string | RegExp): R
  }
}
