import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, {
    name,
    listeners,
    store,
    emitter,
    subscribe,
  } = {}) {
    super($root, listeners)
    this.name = name || ''
    this.emitter = emitter
    this.store = store
    this.subscribe = subscribe || []
    this.unsubscribers = []
    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  $dispatch(action) {
    this.store.dispatch(action)
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
