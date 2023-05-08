import { $ } from '@core/dom'

export class TableResizer {
  #styles = {}

  constructor(resizerEl, $root) {
    this.$resizer = $(resizerEl)
    this.$root = $root
  }

  get styles() {
    return this.#styles
  }

  set styles(val) {
    if (!val) this.#styles = {}
    Object.entries(val).forEach(([prop, value]) => {
      this.#styles[prop] = value
    })
  }

  get type() {
    return this.$resizer.data.resize
  }

  get $resizable() {
    return this.$resizer.closest('[data-type=resizable]')
  }

  get isResizer() {
    return !!this.type
  }

  start() {
    this.$resizer.data.active = ''
    const { coords } = this.$resizable
    const [axis, sideProp, sizeProp] = this.type === 'row'
      ? ['Y', 'bottom', 'height']
      : ['X', 'right', 'width']
    return e => {
      const delta = e[`client${axis}`] - coords[sideProp]
      const newValue = coords[sizeProp] + delta
      if (newValue > 0) {
        this.$resizer.css({ [sideProp]: `${-delta}px` })
        this.styles = { [sizeProp]: `${newValue}px` }
      }
    }
  }

  end() {
    delete this.$resizer.data.active
    this.$resizer.css({ right: 0, bottom: 0 })
    this.$root
      .queryAll(`[data-${this.type}="${this.$resizable.data[this.type]}"]`)
      .forEach(el => {
        $(el).css(this.styles)
      })
    document.onmousemove = null
    document.onmouseup = null
  }
}
