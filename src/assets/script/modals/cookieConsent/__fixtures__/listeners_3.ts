import { addWrapperEventListeners } from '../listeners'

function handler() {
  document.querySelector(`body`)!.innerHTML = `SUCCESS`
}

const wrapper = document.querySelector(`div`)!
addWrapperEventListeners(wrapper, handler)
