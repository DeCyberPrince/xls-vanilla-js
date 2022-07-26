import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from "@src/components/table/table.template";
import {$} from '@core/dom';

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
    const $resizer = $(e.target)
    if (!e.target?.dataset?.resize) return
    const $column = $resizer.closest('[data-type=resizable]')
    const start = $column.coords

    document.onmousemove = docE => {
      const dx = docE.pageX - start.right
      $column.$el.style.width = `${start.width + dx}px`
    }

    document.onmouseup = () => {
      document.onmousemove = null
    }

  }
  onMousemove(e) {

  }

  onMouseup() {

  }
}
