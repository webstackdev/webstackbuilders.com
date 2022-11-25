import { addButtonEventListeners } from '../listeners'

function handler() {
  document.querySelector(`body`)!.innerHTML = `SUCCESS`
}

const button = document.querySelector(`button`)!
addButtonEventListeners(button, handler)
