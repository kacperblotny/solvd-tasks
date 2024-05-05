function throttle(func, interval) {
  let lastExecution = 0

  return function (...args) {
    const now = Date.now()

    if (now - lastExecution >= interval) {
      func.apply(this, args)
      lastExecution = now
    }
  }
}

function onScroll(event) {
  // Handle scroll event
  console.log('Scroll event:', event)
}

const throttledScrollHandler = throttle(onScroll, 1000)

window.addEventListener('scroll', throttledScrollHandler)
