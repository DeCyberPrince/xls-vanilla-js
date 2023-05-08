export class ActiveRoute {
  static get path() {
    return window.location.hash
      .replace('#', '')
  }

  static set path(value) {
    window.location.hash = `#${value}`
  }

  static get param() {
    return ActiveRoute.path.split('/')[1]
  }
}
