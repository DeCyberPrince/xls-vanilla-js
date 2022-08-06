import { capitalize } from '@core/utils'

export class DOMListener {
  constructor ($root, listeners = []) {
    if (!$root) throw new Error('No $root element is provided')
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners () {
    this.listeners.forEach(eventType => {
      const methodName = getMethodName(eventType)
      this[methodName] = this[methodName]?.bind(this)
      if (!this[methodName]) {
        throw new Error(`Method ${methodName} isn't implemented, but mentioned in ${this.name} component`)
      }
      this.$root.on(eventType, this[methodName])
    })
  }

  removeDOMListeners () {
    this.listeners.forEach((eventType) => {
      this.$root.off(eventType, this[getMethodName(eventType)])
    })
  }
}

function getMethodName (nativeEventName) {
  return `on${capitalize(nativeEventName)}`
}
