/**
 * Waits for user interaction by pressing the key, moving a mouse or touching
 * the screen. Useful for cookie consent banners to avoid LCP hit on Lighthouse.
 * If no user interaction occurs within the auto load duration, triggers action.
 */
import type { ScriptInit } from '../@types/general'

/** The events that qualify as user interaction and should trigger executing the action. */
export const eventList: string[] = ['keydown', 'mousemove', 'wheel', 'touchmove', 'touchstart', 'touchend']

/**
 * The maximum period of time in seconds that execution should delay while
 * waiting for user interaction.
 */
export const autoLoadDuration = 5 * 1000

/**
 * Array of function references to execute after the delay
 */
export const addDelayedExecutionScripts = (scriptsFiredOnUserInteraction: ScriptInit[]) => {
  /** Run the scripts after a delay if no user interaction has occurred */
  const runScripts = () => scriptsFiredOnUserInteraction.forEach(script => script())
  const autoLoadTimeout = setTimeout(runScripts, autoLoadDuration)

  const triggerScripts = (_: Event) => {
    clearTimeout(autoLoadTimeout)
    runScripts()
    eventList.forEach(event => document.removeEventListener(event, triggerScripts, false))
  }

  eventList.forEach(function (event) {
    document.addEventListener(event, triggerScripts, { passive: true })
  })
}
