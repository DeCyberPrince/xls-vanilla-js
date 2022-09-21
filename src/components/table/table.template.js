const CHAR_CODES = {
  get A() { return 65 },
  get Z() { return 90 },
}

const createCell = (row, _, column) => {
  return `<div class="cell" 
               contenteditable 
               data-column="${column}"
               data-type="cell"
               data-id="${row}:${column}">
          </div>`
}

const rowWrap = (row, iterCallback) => {
  return iterCallback.bind(null, row)
}

const createColumn = (content, index) => {
  return `
    <div class="column" data-type="resizable" data-column="${index}">
      ${content}
      <div class="column__resizer" data-resize="column"></div>
    </div>
    `
}

const createRow = (content, number) => `
  <div class="row" 
        data-type="resizable" 
        ${number ? 'data-row="' + number + '"' : ''}>
    <div class="row-info">
      ${number >= 0 ? number + 1 : ''}
      ${number
  ? '<div class="row__resizer" data-resize="row"></div>'
  : ''}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `

export const createTable = (
  rowsCount = 30,
  colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1) => {
  const headers = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createColumn)
    .join('')
  const table = [createRow(headers)]

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(rowWrap(i, createCell))
      .join('')
    table.push(createRow(cells, i))
  }
  return table.join('')
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index)
}
