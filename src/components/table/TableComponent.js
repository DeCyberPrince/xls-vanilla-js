import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@src/components/table/table.template'
import {TableResizer} from '@src/components/table/table.resize'

export class TableComponent extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup']
    });
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
}
