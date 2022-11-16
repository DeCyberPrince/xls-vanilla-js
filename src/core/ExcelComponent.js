import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, { name, listeners, store, emitter } = {}) {
    super($root, listeners)
    this.name = name || ''
    this.emitter = emitter
    this.store = store
    this.storeSub = null
    this.unsubscribers = []
  }

  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
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
    this.storeSub.unsubscribe()
  }
}
