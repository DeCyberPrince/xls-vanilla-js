import { CHANGE_TEXT, TABLE_RESIZE } from '@src/store/types'

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const stateName = `${action.data.type}State`
      const currentState = state[stateName] || {}
      currentState[action.data.id] = action.data.value
      return { ...state, [stateName]: currentState }
    }
    case CHANGE_TEXT: {
      const cellState = state.cellState || {}
      cellState[action.data.id] = action.data.value
      return { ...state, text: action.data.value, cellState }
    }
    default:
      return state
  }
}
