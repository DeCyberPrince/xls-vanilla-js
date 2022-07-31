import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from "@src/components/table/table.template";
import {$} from '@core/dom';

export class TableComponent extends ExcelComponent {

  #resizer = {
    selector: '',
    styles: {}
  }

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
    const type = $resizer.data.resize

    this.#resizer.selector = `[data-${type}="${$parent.data[type]}"]`
    $resizer.data.active = ''

    document.onmousemove = docE => {
      if (type === 'column') {
        const dx = docE.pageX - start.right
        if (start.width + dx > 0) {
          $resizer.css({right:`${-dx}px`})
          this.#resizer.styles = {width:`${start.width + dx}px`}
        }
      } else {
        const dy = docE.pageY - start.bottom
        if (start.height + dy > 0) {
          $resizer.css({bottom:`${-dy}px`})
          this.#resizer.styles = {height: `${start.height + dy}px`}
        }

      }


    }

    document.onmouseup = () => {
      delete $resizer.data.active
      $resizer.css({right:0, bottom: 0})
      document.onmousemove = null
      this.$root.queryAll(this.#resizer.selector)
        .forEach(el => {
        $(el).css(this.#resizer.styles)
      })
    }

  }
  onMousemove(e) {

  }

  onMouseup() {

  }
}
