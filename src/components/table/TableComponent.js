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
    if (!$resizer.data.resize) return
    const $parent = $resizer.closest('[data-type=resizable]')
    const start = $parent.coords
    const cells = this.$root.queryAll(`[data-column="${$parent.data.column}"]`)
    const type = $resizer.data.resize

    document.onmousemove = docE => {
      if (type === 'column') {
        const dx = docE.pageX - start.right
        const newWidth = {width:`${start.width + dx}px`}
        $parent.css(newWidth)
        cells.forEach(cell => {
          $(cell).css(newWidth)
        })
      } else {
        const dy = docE.pageY - start.bottom
        $parent.css({height: `${start.height + dy}px`})
      }


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
