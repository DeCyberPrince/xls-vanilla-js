import { DEFAULT_CELL_STYLE } from '@src/constants'
import { CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE } from '@src/store/types'

export function rootReducer(state, action) {
  let field = null
  switch (action.type) {
    case TABLE_RESIZE:
      field = `${action.data.type}State`
      return {
        ...state, [field]: value(state, field, action),
      }
    case CHANGE_TEXT:
      field = 'cellState'
      return {
        ...state,
        formulaText: action.data.value,
        [field]: value(state, field, action),
      }
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data,
      }
    case APPLY_STYLE: {
      field = 'stylesState'
      const newVal = state[field] || {}
      action.data.ids.forEach(id => {
        newVal[id] = {
          ...DEFAULT_CELL_STYLE,
          ...newVal[id],
          ...action.data.value,
        }
      })
      return {
        ...state,
        [field]: newVal,
        currentStyles: {
          ...state.currentStyles,
          ...action.data.value,
        },
      }
    }
    case CHANGE_TITLE:
      field = 'title'
      return {
        ...state,
        [field]: action.data.value,
      }
    default:
      return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
