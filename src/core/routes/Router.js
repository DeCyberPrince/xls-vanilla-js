import { $ } from '@core/dom'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Router {
  currentPage = null
  constructor(selector, routes) {
    if (!selector) throw new Error('selector is not provided in Router instance')
    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }

  changePageHandler() {
    this.currentPage?.destroy()
    const Page = ActiveRoute.path === 'excel'
      ? this.routes.excel
      : this.routes.dashboard
    console.log(ActiveRoute.path)
    this.currentPage = new Page(ActiveRoute.param)
    this.$placeholder.clear()
    this.$placeholder.append(this.currentPage.$root)
    this.currentPage.afterRender()
  }
}
