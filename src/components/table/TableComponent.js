import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from "@src/components/table/table.template";

export class TableComponent extends ExcelComponent {
  static className = 'excel__table'
  toHTML() {
    return createTable()
  }
}
