export class Page {
  constructor(params) {
    this.params = params
  }

  get $root() {
    throw new Error('Getter $root must be implemented')
  }

  afterRender() {}

  destroy() {}
}
