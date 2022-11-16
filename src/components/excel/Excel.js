import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'

export class Excel {
  constructor(selector, { components = [], store }) {
    this.$el = $(selector)
    this.components = components
    this.store = store
    this.emitter = new Emitter()
  }

  get $root() {
    const $rootEl = $.create('excel')
    this.components = this.components.map(Component => {
      const $componentEl = $.create(Component.className)
      const componentOptions = {
        emitter: this.emitter,
        store: this.store,
      }
      const component = new Component($componentEl, componentOptions)
      $componentEl.html(component.toHTML())
      $rootEl.append($componentEl)
      window[`$${component.name}`] = component
      return component
    })
    return $rootEl
  }

  render() {
    this.$el.append(this.$root)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
