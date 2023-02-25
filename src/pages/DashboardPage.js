import { $ } from '@core/dom'
import { Page } from '@core/Page'
import { getRecords } from '@src/pages/dashboard'

export class DashboardPage extends Page {
  get $root() {
    const id = Date.now()
    return $.create('dashboard').html(`
<div class="dashboard__header">
  <h1>Dashboard</h1>
</div>
<div class="dashboard__new">
  <div class="dashboard__view">
    <a href="#excel/${id}" class="dashboard__create">New Table</a>
  </div>
</div>
<div class="dashboard__table dashboard__view">
  ${getRecords()}
</div>
    `)
  }
}
