class DOM {
  constructor(element) {
    this.$el = element instanceof HTMLElement
      ? element
      : document.querySelector(element)
  }

  html(htmlStr) {
    if (typeof htmlStr === 'string') {
      this.$el.innerHTML = htmlStr
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(element) {
    if (element instanceof DOM) element = element.$el
    this.$el.append(element)
    return this
  }

  on(eventType, fn) {
    this.$el.addEventListener(eventType, fn)
  }

  off(eventType, fn) {
    this.$el.removeEventListener(eventType, fn)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  get data() {
    return this.$el.dataset
  }

  get coords() {
    return this.$el.getBoundingClientRect()
  }

  queryAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
}

export function $(element){
  return new DOM(element)
}

$.create = (classesStr = '', tagName = 'div') => {
  const $element = document.createElement(tagName)
  if (classesStr) $element.classList.add(classesStr)
  return $($element)
}


