export class TableSelection {
  static selectionClass = 'selected'

  #group = []
  current = null

  get selectedIds() {
    return this.#group.map($el => $el.data.id)
  }

  select($el) {
    this.clearAllSelections()
    this.#group.push($el)
    $el.focus().classes.add(TableSelection.selectionClass)
    this.current = $el
  }

  selectGroup($group = []) {
    this.clearAllSelections()
    this.#group = $group
    this.#group
      .forEach($cell => $cell.classes.add(TableSelection.selectionClass))
  }

  clearAllSelections() {
    const clearedItems = this.#group.splice(0)
    clearedItems
      .forEach($item =>
        $item.classes.remove(TableSelection.selectionClass))
  }

  applyStyle(style) {
    this.#group.forEach($el => $el.css(style))
  }
}
