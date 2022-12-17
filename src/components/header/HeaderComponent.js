import { $ } from '@core/dom'
import { DEFAULT_TITLE } from '@src/constants'
import * as actions from '@src/store/actions'
import { ExcelComponent } from '@core/ExcelComponent'

export class HeaderComponent extends ExcelComponent {
  static className = 'excel__header'

  #title = null

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
      listeners: ['input'],
    })
  }

  onInput(event) {
    const $title = $(event.target)
    this.$dispatch(actions.changeTitle({ value: $title.value }))
  }

  init() {
    super.init()
    this.#title = this.$root.query('[data-title-input]')
  }

  toHTML() {
    const { title } = this.store.getState()
    return `
    <input type="text" class="input" data-title-input value="${title || DEFAULT_TITLE}"/>
    <div>
      <div class="button">
        <i class="material-icons">delete</i>
      </div>
      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>
    `
  }
}
