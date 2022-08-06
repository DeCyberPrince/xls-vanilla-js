import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor ($root, { name, listeners } = {}) {
    super($root, listeners)
    this.name = name || ''
  }

  toHTML () {
    return ''
  }

  init () {
    this.initDOMListeners()
  }

  destroy () {
    this.removeDOMListeners()
  }
}
