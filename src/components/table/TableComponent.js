import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@src/components/table/table.template'
import { TableResizer } from '@src/components/table/table.resize'
import { TableSelection } from '@src/components/table/TableSelection'
import { $ } from '@core/dom'
import { getCellCoords, matrix, nextSelector } from '@core/utils'

export class TableComponent extends ExcelComponent {
  static className = 'excel__table'

  #selection = new TableSelection()

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return createTable()
  }

  onMousedown(e) {
    const $resizer = new TableResizer(e.target, this.$root)
    if (!$resizer.isResizer) return
    document.onmousemove = $resizer.start()
    document.onmouseup = () => $resizer.end()
  }

  onClick(e) {
    const $cell = $(e.target)
    if ($cell.data.type !== 'cell') return
    const shiftPressed = e.shiftKey
    if (shiftPressed) {
      const $cells = matrix($cell, this.#selection.current)
        .map(id => this.$root.query(`[data-id="${id}"]`))
      this.#selection.selectGroup($cells)
    } else {
      this.$select($cell)
    }
  }

  onKeydown(e) {
    const keys = [
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'Enter',
      'Tab',
    ]
    if (!(keys.includes(e.code) && !e.shiftKey)) return
    e.preventDefault()
    const currentCoords = getCellCoords(this.#selection.current)
    const $next = this.$root.query(nextSelector(currentCoords, e.code))
    if (!$next) return
    this.$select($next)
  }

  onInput(e) {
    const text = $(e.target).text()?.trim()
    this.$emit('table:input', text)
  }

  $select($cell) {
    this.#selection.select($cell)
    this.$emit('table:select', $cell)
  }

  init() {
    super.init()
    this.$select(this.$root.query('[data-id="0:0"]'))
    this.$on('formula:input', text => {
      this.#selection.current.text(text)
    })
    this.$on('formula:done', () => this.#selection.current.focus())
  }
}
