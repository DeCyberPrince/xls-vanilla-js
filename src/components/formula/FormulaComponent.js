import { ExcelComponent } from '@core/ExcelComponent'

export class FormulaComponent extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    })
  }

  toHTML() {
    return `
    <div class="info">f(x)</div>
    <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    const text = event.target.textContent
    this.$emit('formula:input', text)
  }
}
