import { $ } from '@core/dom'
import * as actions from '@src/store/actions'
import { ExcelComponent } from '@core/ExcelComponent'
import { ActiveRoute } from '@core/routes/ActiveRoute'
import { storage } from '@core/utils'

export class HeaderComponent extends ExcelComponent {
  static className = 'excel__header'

  #title = null

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
      listeners: ['input', 'click'],
    })
  }

  onInput(event) {
    const $title = $(event.target)
    this.$dispatch(actions.changeTitle({ value: $title.value }))
  }

  onClick(e) {
    const $btn = $(e.target).closest('[data-action]')
    if (!$btn) return
    switch ($btn.data.action) {
      case 'delete':
        storage.clear(`excel:${ActiveRoute.param}`)
        this.goToDashboard()
        break
      case 'exit':
        this.goToDashboard()
        break
    }
  }

  goToDashboard() {
    ActiveRoute.path = 'dashboard'
  }

  init() {
    super.init()
    this.#title = this.$root.query('[data-title-input]')
  }

  toHTML() {
    const { title } = this.store.getState()
    console.log('HeaderComponent title:', title)
    return `
    <input type="text" class="input" data-title-input value="${title}"/>
    <div>
      <div class="button">
        <i class="material-icons" data-action="delete">delete</i>
      </div>
      <div class="button">
        <i class="material-icons" data-action="exit">exit_to_app</i>
      </div>
    </div>
    `
  }
}
