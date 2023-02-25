export class ActiveRoute {
  static get path() {
    return window.location.hash
      .replace('#', '')
      .split('/')[0]
  }

  static get param() {
    return ActiveRoute.path.split('/')[1]
  }
}
