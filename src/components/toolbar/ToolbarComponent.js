import { $ } from '@core/dom'
import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { createToolbar } from '@src/components/toolbar/toolbar.template'
import { DEFAULT_CELL_STYLE } from '@src/constants'

export class ToolbarComponent extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }

  get template() {
    return createToolbar(this.state)
  }

  prepare() {
    this.initState(DEFAULT_CELL_STYLE)
  }

  onClick(e) {
    const $target = $(e.target).closest('[data-type="toolbar-button"]')
    if ($target) {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  toHTML() {
    return this.template
  }
}
