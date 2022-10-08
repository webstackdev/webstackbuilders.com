import { addAllLoaderEventListeners } from '../listeners'
import type { ScriptInit } from '../../@types/general'

const dummyEventTarget: ScriptInit = () => {
  document.body.appendChild(document.createElement('hr'))
}

addAllLoaderEventListeners(
  [dummyEventTarget],
  [dummyEventTarget],
  []
)
