import { $ } from '@core/dom'

export class Excel {
  constructor(selector, { components = [] }) {
    this.$el = $(selector)
    this.components = components
  }

  get $root() {
    const $rootEl = $.create('excel')
    this.components = this.components.map(Component => {
      const $componentEl = $.create(Component.className)
      const component = new Component($componentEl)
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
}
