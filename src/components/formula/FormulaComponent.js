import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'

export class FormulaComponent extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
    this.$input = null
  }

  toHTML() {
    return `
    <div class="info">f(x)</div>
    <div class="input" contenteditable spellcheck="false" data-input></div>
    `
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$emit('formula:input', text)
  }

  onKeydown(event) {
    switch (event.code) {
      case 'Enter':
      case 'Tab':
        event.preventDefault()
        this.$emit('formula:done')
        break
      default:
        break
    }
  }

  init() {
    super.init()
    this.$input = this.$root.query('[data-input]')

    this.$on('table:select', $cell => {
      this.$input.text($cell.text())
    })

    this.$subscribe(state => {
      this.$input.text(state.text)
    })
  }
}
