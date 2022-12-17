import { parse } from '@core/parse'
import { toInlineStyles } from '@core/utils'
import { DEFAULT_CELL_STYLE } from '@src/constants'

const CHAR_CODES = {
  get A() { return 65 },
  get Z() { return 90 },
}

const DEFAULT = {
  HEIGHT: 24,
  WIDTH: 120,
}

const createCell = (state, row) => {
  return (_, column) => {
    const id = `${row}:${column}`
    const content = state.cellState?.[id] ?? ''
    const styles = toInlineStyles(state.stylesState?.[id] || DEFAULT_CELL_STYLE)
    return `<div class="cell" 
           contenteditable 
           data-column="${column}"
           data-type="cell"
           data-id="${row}:${column}"
           data-value="${content}"
           style="width: ${state.columnState?.[column] || DEFAULT.WIDTH}px;${styles};"
           > ${parse(content)}
      </div>`
  }
}

const createColumn = ({ content, index, width }) => {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-column="${index}" 
      style="width: ${width}"
      >
      ${content}
      <div class="column__resizer" data-resize="column"></div>
    </div>
    `
}

const createRow = (content, number, state) => `
  <div class="row" 
        data-type="resizable" 
        ${number >= 0 ? 'data-row="' + number + '"' : ''}
        style="height: ${state?.[number] || DEFAULT.HEIGHT}px"
        >
    <div class="row-info">
      ${number >= 0 ? number + 1 : ''}
      ${number >= 0
  ? '<div class="row__resizer" data-resize="row"></div>'
  : ''}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `

const applyState = state => (content, index) => ({
  content,
  index,
  width: `${state?.[index] || DEFAULT.WIDTH}px`,
})

export const createTable = (
  rowsCount = 30,
  colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1,
  state = {}) => {
  console.log('createTable', state)
  const headers = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(applyState(state.columnState))
    .map(createColumn)
    .join('')
  const table = [createRow(headers)]

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(state, i))
      .join('')
    table.push(createRow(cells, i, state.rowState))
  }
  return table.join('')
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index)
}
