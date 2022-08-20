import { Excel } from '@src/components/excel/Excel'
import './styles/index.scss'

import { HeaderComponent } from '@src/components/header/HeaderComponent'
import { ToolbarComponent } from '@src/components/toolbar/ToolbarComponent'
import { FormulaComponent } from '@src/components/formula/FormulaComponent'
import { TableComponent } from '@src/components/table/TableComponent'

const excelApp = new Excel('#app', {
  components: [
    HeaderComponent,
    ToolbarComponent,
    FormulaComponent,
    TableComponent,
  ],
})

excelApp.render()
