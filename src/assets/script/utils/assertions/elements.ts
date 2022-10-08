/**
 * Type guards for HTML elements
 */

/**
 * Type narrowing for type 1 Element nodes like <p> or <div>. Eliminates text
 * nodes, attribute nodes, comments, CDATA, doctypes, processing instructions
 * in XML docs, the Document object, and DocumentFragments.
 */
export function isType1Element(element: unknown): element is Element {
  if (
    element &&
    typeof element === 'object' &&
    'tagName' in (element as Element) &&
    (element as Element).nodeType === Node.ELEMENT_NODE
  )
    return true
  return false
}

export function isAnchorElement(element: unknown): element is HTMLAnchorElement {
  if (isType1Element(element) && element[`tagName`] === `A`) return true
  return false
}

export function isBodyElement(element: unknown): element is HTMLBodyElement {
  if (isType1Element(element) && element[`tagName`] === `BODY`) return true
  return false
}

export function isButtonElement(element: unknown): element is HTMLButtonElement {
  if (isType1Element(element) && element[`tagName`] === `BUTTON`) return true
  return false
}

export function isDivElement(element: unknown): element is HTMLDivElement {
  if (isType1Element(element) && element[`tagName`] === `DIV`) return true
  return false
}

export function isHtmlElement(element: unknown): element is HTMLHtmlElement {
  if (isType1Element(element) && element[`tagName`] === `HTML`) return true
  return false
}

export function isImageElement(element: unknown): element is HTMLImageElement {
  if (isType1Element(element) && element[`tagName`] === `IMG`) return true
  return false
}

export function isNavElement(element: unknown): element is HTMLElement {
  if (isType1Element(element) && element[`tagName`] === `NAV`) return true
  return false
}

export function isShadowRoot(element: unknown): element is ShadowRoot {
  if (
    element &&
    typeof element === 'object' &&
    (element as unknown as ShadowRoot)['mode'] === 'open'
  )
    return true
  return false
}

export function isSlotElement(element: unknown): element is HTMLSlotElement {
  if (isType1Element(element) && element[`tagName`] === `SLOT`) return true
  return false
}

export function isUlElement(element: unknown): element is HTMLUListElement {
  if (isType1Element(element) && element[`tagName`] === `UL`) return true
  return false
}
