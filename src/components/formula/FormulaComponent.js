import {ExcelComponent} from '@core/ExcelComponent'

export class FormulaComponent extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    });
  }
  toHTML() {
    return `
    <div class="info">f(x)</div>
    <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {}
}
