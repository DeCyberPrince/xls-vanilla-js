import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, { name, listeners, emitter } = {}) {
    super($root, listeners)
    this.name = name || ''
    this.emitter = emitter
    this.unsubscribers = []
  }

  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsubscribe = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsubscribe)
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsubscribe => unsubscribe())
  }
}
