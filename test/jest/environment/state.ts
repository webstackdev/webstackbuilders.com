/**
 * Data structure to maintain state of JSDom 'document' and 'window' objects between tests
 */
export type NodeMapper = { document: Document; window: Window }

export type NodeName = keyof NodeMapper

export type EventListenerRecord = {
  type: string
  listener: EventListenerOrEventListenerObject
  options?: boolean | AddEventListenerOptions
}

export type removalCb = (
  nodeName: NodeName,
  { type, listener, options }: EventListenerRecord
) => void
type removalCbs = removalCb | removalCb[]

function isListenerStateInstance(input: unknown): input is ListenerState {
  const isDefined = !!input
  const isInstanceOf = input instanceof ListenerState
  if (isDefined && isInstanceOf) return true
  return false
}

export const getState = (): ListenerState => {
  const state = globalThis.EVENT_LISTENER_STATE
  if (!isListenerStateInstance(state)) {
    throw new Error(`Global event listener state not a valid instance of ListenerState`)
  }
  return state
}

export class ListenerState {
  public originalWindowAddEventListener: Window['addEventListener']
  public originalWindowRemoveEventListener: Window['removeEventListener']
  private windowAddEventListenerRefs: EventListenerRecord[] = []
  private windowTrackedKeys: string[]
  public originalDocumentAddEventListener: Document['addEventListener']
  public originalDocumentRemoveEventListener: Document['removeEventListener']
  private documentAddEventListenerRefs: EventListenerRecord[] = []
  private documentTrackedKeys: string[]
  public nodeNames: NodeName[]
  private errorListenerCount: number
  public isListenerStateInstance: boolean

  constructor(window: Window, document: Document) {
    /** Initialize tracked keys that should not be removed from global objects during reset */
    this.windowTrackedKeys = Object.keys(window)
    this.windowTrackedKeys.push('addEventListener')
    this.documentTrackedKeys = Object.keys(document)
    this.documentTrackedKeys.push('addEventListener')
    /** Cache bound original event listeners */
    this.originalWindowAddEventListener = window.addEventListener.bind(window)
    this.originalWindowRemoveEventListener = window.removeEventListener.bind(window)
    this.originalDocumentAddEventListener = document.addEventListener.bind(document)
    this.originalDocumentRemoveEventListener = document.removeEventListener.bind(document)
    /** Global objects to manage */
    this.nodeNames = ['document', 'window']
    this.errorListenerCount = 0
    this.isListenerStateInstance = true
  }

  /** Enable instanceof checks across realms for object instances */
  static [Symbol.hasInstance](instance: unknown) {
    return (
      instance &&
      typeof instance === 'object' &&
      (instance as ListenerState)['isListenerStateInstance' as keyof ListenerState]
    )
  }

  /**
   * Get the original add event listener by node name
   */
  callOriginalAddEventListener(
    nodeName: NodeName,
    { type, listener, options }: EventListenerRecord
  ) {
    if (nodeName === `document`) {
      this.originalDocumentAddEventListener(type, listener, options)
    } else {
      this.originalWindowAddEventListener(type, listener, options)
    }
  }

  /**
   * Store listener reference on addEventListener call so it can be removed during reset
   */
  addEventListenerToTracking(nodeName: NodeName, ref: EventListenerRecord) {
    this[`${nodeName}AddEventListenerRefs`].push(ref)
  }

  /**
   * Reset event listeners
   */
  resetEventListenerTracking(cb: removalCbs) {
    const cbArr = Array.isArray(cb) ? cb : [cb]
    this.nodeNames.forEach(nodeName => {
      const refs = this[`${nodeName}AddEventListenerRefs`]
      while (refs.length) {
        // pop() widens type to include 'undefined'
        const ref = refs.pop()!
        cbArr.forEach(callback => {
          callback(nodeName, ref)
        })
      }
    })
  }

  getErrorListenerCount() {
    return this.errorListenerCount
  }

  decrementErrorListenerCount() {
    this.errorListenerCount--
  }

  incrementErrorListenerCount() {
    this.errorListenerCount++
  }

  /**
   * Array filter callback to check if a given key on the 'window' or 'document global
   * objects should be ignored as keys are removed in cleanup, because it is tracked here
   */
  filterTrackedGlobalKeys(nodeName: NodeName) {
    const trackedKeys = this[`${nodeName}TrackedKeys`]
    return function (key: string) {
      return !trackedKeys.includes(key)
    }
  }
}
