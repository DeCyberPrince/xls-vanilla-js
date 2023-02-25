import './styles/index.scss'

import { Router } from '@core/routes/Router'
import { DashboardPage } from '@src/pages/DashboardPage'
import { ExcelPage } from '@src/pages/ExcelPage'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
