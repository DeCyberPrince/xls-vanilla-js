import { Page } from '@core/Page'

import { Store } from '@core/createStore'
import { debounce, storage } from '@core/utils'
import { rootReducer } from '@src/store/rootReducer'
import { Excel } from '@src/components/excel/Excel'

import { HeaderComponent } from '@src/components/header/HeaderComponent'
import { ToolbarComponent } from '@src/components/toolbar/ToolbarComponent'
import { FormulaComponent } from '@src/components/formula/FormulaComponent'
import { TableComponent } from '@src/components/table/TableComponent'

export class ExcelPage extends Page {
  get $root() {
    const store = new Store(rootReducer, storage('excel-state') || {})

    const stateListener = debounce(state => {
      storage('excel-state', state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [
        HeaderComponent,
        ToolbarComponent,
        FormulaComponent,
        TableComponent,
      ],
      store,
    })

    return this.excel.$root
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
