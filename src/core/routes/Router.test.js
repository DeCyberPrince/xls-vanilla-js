import { Router } from './Router'
import { Page } from '../Page'

class DashboardPageMock extends Page {
  get $root() {
    const $root = document.createElement('div')
    $root.innerHTML = 'Dashboard'
    return $root
  }
}
class ExcelPageMock extends Page {}

describe('Router', () => {
  let router = null
  let $root = null

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPageMock,
      excel: ExcelPageMock,
    })
  })

  test('Router should be defined', () => {
    expect(router).toBeDefined()
  })

  test('Router should render page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>Dashboard</div>')
  })
})
