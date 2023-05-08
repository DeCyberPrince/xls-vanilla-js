import { Page } from '@core/Page'

import { Store } from '@core/store/Store'
import { debounce, storage } from '@core/utils'
import { rootReducer } from '@src/store/rootReducer'
import { Excel } from '@src/components/excel/Excel'

import { HeaderComponent } from '@src/components/header/HeaderComponent'
import { ToolbarComponent } from '@src/components/toolbar/ToolbarComponent'
import { FormulaComponent } from '@src/components/formula/FormulaComponent'
import { TableComponent } from '@src/components/table/TableComponent'
import { DEFAULT_STATE } from '@src/constants'

export class ExcelPage extends Page {
  get $root() {
    const storageKey = `excel:${this.params}`

    const initialState = {
      ...DEFAULT_STATE,
      ...storage(storageKey),
      lastOpened: Date.now(),
    }
    const store = new Store(rootReducer, initialState)

    const stateListener = debounce(state => {
      storage(storageKey, state)
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
