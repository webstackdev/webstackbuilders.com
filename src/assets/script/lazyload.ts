// create config object: rootMargin and threshold
// are two properties exposed by the interface
const config = {
  rootMargin: '0px 0px 50px 0px',
  threshold: 0,
}

let loaded = 0

function isImageElement(img: any): img is HTMLImageElement {
  return (img as HTMLImageElement).src !== undefined
}

const preloadImage = (img: Element) => {
  if (!isImageElement(img)) return
  const src = img.getAttribute('data-src')
  if (src) img.src = src
}

// register the config object with an instance
// of intersectionObserver
let observer = new IntersectionObserver(function (entries, self) {
  // iterate over each entry
  entries.forEach(entry => {
    // process just the images that are intersecting.
    // isIntersecting is a property exposed by the interface
    if (entry.isIntersecting) {
      // custom function that copies the path to the img
      // from data-src to src
      preloadImage(entry.target)
      // the image is now in place, stop watching
      self.unobserve(entry.target)
    }
  })
}, config)

const imgs = document.querySelectorAll('[data-src]')
imgs.forEach(img => {
  observer.observe(img)
})
