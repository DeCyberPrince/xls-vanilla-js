export class TableSelection {
  #group = []

  select($el) {
    this.#group.push($el)
    $el.classes.add('selected')
  }

  selectGroup() {}
}
