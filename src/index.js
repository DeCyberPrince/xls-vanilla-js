import { Store } from '@core/createStore'
import { debounce, storage } from '@core/utils'
import { rootReducer } from '@src/store/rootReducer'
import { Excel } from '@src/components/excel/Excel'
import './styles/index.scss'

import { HeaderComponent } from '@src/components/header/HeaderComponent'
import { ToolbarComponent } from '@src/components/toolbar/ToolbarComponent'
import { FormulaComponent } from '@src/components/formula/FormulaComponent'
import { TableComponent } from '@src/components/table/TableComponent'

const store = new Store(rootReducer, storage('excel-state') || {})

const stateListener = debounce(state => {
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excelApp = new Excel('#app', {
  components: [
    HeaderComponent,
    ToolbarComponent,
    FormulaComponent,
    TableComponent,
  ],
  store,
})

excelApp.render()
