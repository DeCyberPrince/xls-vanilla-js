import { Store } from './Store'
import { re } from '@babel/core/lib/vendor/import-meta-resolve'

const initialState = { count: 0 }

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + 1 }
  }
  return state
}

describe('Store', () => {
  let store = null
  let handler = null

  beforeEach(() => {
    store = new Store(reducer, initialState)
    handler = jest.fn()
  })

  test('Return Store instance', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState()).not.toBeUndefined()
  })

  test('Should return Object and be an initial state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('Should return initial state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('Should change state if any existing action applied', () => {
    store.dispatch({ type: 'ADD' })
    expect(store.getState().count).toBe(1)
  })

  test('Should NOT change state if any NOT existing action applied', () => {
    store.dispatch({ type: 'NOT_EXISTING_ACTION' })
    expect(store.getState().count).toBe(0)
  })

  test('Should call subscriber fn', () => {
    store.subscribe(handler)
    store.dispatch({ type: 'ADD' })
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('Should NOT call subscriber fn if unsubscribed', () => {
    const sub = store.subscribe(handler)
    sub.unsubscribe()
    store.dispatch({ type: 'ADD' })
    expect(handler).not.toHaveBeenCalled()
  })

  test('Should work properly with async fn', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' })
      }, 500)
      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 500)
    })
  })
})
