const CHAR_CODES = {
  get A() {return 65},
  get Z() {return 90}
}

const createCell = () => {
  return `<div class="cell" contenteditable></div>`
}

const createCol = content => {
  return `
    <div class="column" data-type="resizable">
      ${content}
      <div class="column__resizer" data-resize="column"></div>
    </div>
    `
}

const createRow = (content, number) => `
  <div class="row">
    <div class="row-info">
      ${number || ''}
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
    .map(createCol)
    .join('')
  const cells = new Array(colsCount)
    .fill('')
    .map(createCell)
    .join('')

  const table = [createRow(headers)]
  for (let i = 1; i <= rowsCount; i++) {
    table.push(createRow(cells, i))
  }
  return table.join('')
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index)
}
