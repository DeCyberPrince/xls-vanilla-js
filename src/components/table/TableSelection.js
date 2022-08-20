export class TableSelection {
  static selectionClass = 'selected'

  #group = []
  current = null

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
}

// function getSelectedCellsSelector(elA, elB) {
//   const [[rowA, colA], [rowB, colB]] = [
//     elA.data.id.split(':'),
//     elB.data.id.split(':'),
//   ]
//   const selectors = []
//   const [startRow, endRow] = [Math.min(rowA, rowB), Math.max(rowA, rowB)]
//   const [startCol, endCol] = [Math.min(colA, colB), Math.max(colA, colB)]
//   for (let i = startRow; i <= endRow; i++) {
//     for (let j = startCol; j <= endCol; j++) {
//       selectors.push(`[data-id="${i}:${j}"]`)
//     }
//   }
//   return selectors.join()
// }
