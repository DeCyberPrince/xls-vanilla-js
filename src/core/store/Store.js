export class Store {
  #state = null
  #listeners = []
  #rootReducer = () => {}

  constructor(rootReducer, initialState = {}) {
    this.#rootReducer = rootReducer
    this.#state = this.#rootReducer(initialState, { type: '__INIT__' })
  }

  subscribe(fn) {
    this.#listeners.push(fn)
    return {
      unsubscribe: () => {
        this.#listeners = this.#listeners.filter(l => l !== fn)
      },
    }
  }

  dispatch(action) {
    this.#state = this.#rootReducer(this.#state, action)
    this.#listeners.forEach(listener => listener(this.#state))
  }

  getState() {
    return this.#state
  }
}
