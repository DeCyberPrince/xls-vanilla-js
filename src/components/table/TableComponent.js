import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@src/components/table/table.template'
import { TableResizer } from '@src/components/table/table.resize'
import { TableSelection } from '@src/components/table/TableSelection'

export class TableComponent extends ExcelComponent {
  static className = 'excel__table'

  #selection = null

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup']
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

  init() {
    super.init()
    this.#selection = new TableSelection()
    const firstSelection = this.$root.query('[data-id="0:0"]')
    this.#selection.select(firstSelection)
  }
}
