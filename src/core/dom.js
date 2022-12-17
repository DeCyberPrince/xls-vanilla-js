class DOM {
  constructor(element) {
    this.$el = element instanceof HTMLElement
      ? element
      : document.querySelector(element)
  }

  get data() {
    return this.$el.dataset
  }

  get coords() {
    return this.$el.getBoundingClientRect()
  }

  get classes() {
    return this.$el.classList
  }

  get value() {
    return this.$el.value
  }

  set value(val) {
    this.$el.value = val
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

  text(text = null) {
    if (text === null) {
      return this.$el.textContent.trim()
    }
    this.$el.textContent = text
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

  query(selector) {
    return $(this.$el.querySelector(selector))
  }

  queryAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object.entries(styles)
      .forEach(([prop, value]) => (this.$el.style[prop] = value))
    return this
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  focus() {
    this.$el.focus()
    return this
  }
}

export function $(element) {
  const $dom = new DOM(element)
  return $dom.$el ? $dom : null
}

$.create = (classesStr = '', tagName = 'div') => {
  const $element = document.createElement(tagName)
  if (classesStr) $element.classList.add(classesStr)
  return $($element)
}
