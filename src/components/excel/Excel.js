import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'
import { StoreSubscriber } from '@core/StoreSubscriber'

export class Excel {
  constructor(selector, { components = [], store }) {
    this.$el = $(selector)
    this.components = components
    this.store = store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
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
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
