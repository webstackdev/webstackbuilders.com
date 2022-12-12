import { addDomLoadedEventListeners } from '../loaders'
import type { ScriptInit } from '../../@types/general'

const dummyEventTarget: ScriptInit = () => {
  document.body.appendChild(document.createElement('hr'))
}

addDomLoadedEventListeners([dummyEventTarget, dummyEventTarget])
