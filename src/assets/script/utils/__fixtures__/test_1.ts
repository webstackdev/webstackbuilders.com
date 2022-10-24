function triggerScripts (_: Event) {
  //document.body.appendChild(document.createElement('hr'))
  //document.removeEventListener('mousemove', triggerScripts, false)
  console.log(`something`)
}
document.body.appendChild(document.createElement('hr'))
document.addEventListener('mousemove', triggerScripts)
document.body.appendChild(document.createElement('hr'))
