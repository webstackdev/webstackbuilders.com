import { addLoadedEventListeners } from '../listeners'
import type { ScriptInit } from '../../@types/general'

const dummyEventTarget: ScriptInit = () => {
  document.body.appendChild(document.createElement('hr'))
}

addLoadedEventListeners([dummyEventTarget, dummyEventTarget])
