import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@src/components/table/table.template'
import { TableResizer } from '@src/components/table/table.resize'
import { TableSelection } from '@src/components/table/TableSelection'
import { $ } from '@core/dom'
import { matrix } from '@core/utils'

export class TableComponent extends ExcelComponent {
  static className = 'excel__table'

  #selection = new TableSelection()

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup', 'click']
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

  onMousemove(e) {}

  onMouseup() {}

  onClick(e) {
    const $cell = $(e.target)
    if ($cell.data.type !== 'cell') return
    const shiftPressed = e.shiftKey
    if (shiftPressed) {
      const $cells = matrix($cell, this.#selection.current)
        .map(id => this.$root.query(`[data-id="${id}"]`))
      this.#selection.selectGroup($cells)
    } else {
      this.#selection.select($cell)
    }
  }

  init() {
    super.init()
    const firstSelection = this.$root.query('[data-id="0:0"]')
    this.#selection.select(firstSelection)
  }
}
