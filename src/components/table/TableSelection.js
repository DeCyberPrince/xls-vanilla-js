export class TableSelection {
  static selectionClass = 'selected'

  #group = []

  select($el) {
    if ($el.data.type !== 'cell') return
    this.clearAllSelections($el)
    this.#group.forEach(cell => cell.classes.add(TableSelection.selectionClass))
  }

  selectGroup() {}

  clearAllSelections(...addItems) {
    const clearedItems = this.#group.splice(0, this.#group.length, ...addItems)
    clearedItems.forEach($item => $item.classes.remove(TableSelection.selectionClass))
  }
}
