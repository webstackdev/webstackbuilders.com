/**
 * Data structure to maintain state of JSDom 'document' and 'window' objects between tests
 */
export type NodeMapper = { document: Document; window: Window }
export type NodeName = keyof NodeMapper

type eventListenerRecord = {
  type: string
  listener: EventListenerOrEventListenerObject
  options?: boolean | AddEventListenerOptions
}

type SideEffects = {
  [K in NodeName]: {
    addEventListener: {
      fn: NodeMapper[K]['addEventListener']
      refs: eventListenerRecord[]
    }
    keys: string[]
  }
}

export const sideEffects: SideEffects = {
  document: {
    addEventListener: {
      /* eslint-disable-next-line @typescript-eslint/unbound-method */
      fn: document.addEventListener,
      refs: [],
    },
    keys: Object.keys(document),
  },
  window: {
    addEventListener: {
      fn: window.addEventListener,
      refs: [],
    },
    keys: Object.keys(window),
  },
}

/** @example ['document', 'window'] */
export const nodeNames = Object.keys(sideEffects) as unknown as NodeName[]

/**
 * Add to the DOM object default key array to prevent removal during reset
 */
export const addCachedKey = (nodeName: NodeName) => {
  sideEffects[nodeName].keys.push('addEventListener')
}
