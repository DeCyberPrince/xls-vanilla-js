import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { getCellCoords, matrix, nextSelector } from '@core/utils'
import { TableResizer } from '@src/components/table/table.resize'
import { createTable } from '@src/components/table/table.template'
import { TableSelection } from '@src/components/table/TableSelection'
import { DEFAULT_CELL_STYLE } from '@src/constants'
import * as actions from '@src/store/actions'

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
    return createTable(34, 26, this.store.getState())
  }

  onMousedown(e) {
    const $resizer = new TableResizer(e.target, this.$root)
    if (!$resizer.isResizer) return
    document.onmousemove = $resizer.start()
    document.onmouseup = () => {
      $resizer.end()
      const element = $resizer.$resizable
      this.$dispatch(actions.tableResize({
        type: $resizer.type,
        id: element.data[$resizer.type],
        value: element.coords[$resizer.type === 'row' ? 'height' : 'width'],
      }))
    }
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
    const $cell = $(e.target)
    this.updateText($cell.data.id, $cell.text()?.trim())
  }

  $select($cell) {
    this.#selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(DEFAULT_CELL_STYLE))
    this.$dispatch(actions.changeStyles(styles))
  }

  updateText(id, value) {
    this.$dispatch(actions.changeText({ id, value }))
  }

  init() {
    super.init()
    this.$select(this.$root.query('[data-id="0:0"]'))
    this.$on('formula:input', text => {
      this.#selection.current.text(text)
      this.updateText(this.#selection.current.data.id, text)
    })
    this.$on('formula:done', () => this.#selection.current.focus())
    this.$on('toolbar:applyStyle', value => {
      this.#selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        ids: this.#selection.selectedIds,
        value,
      }))
    })
  }
}
