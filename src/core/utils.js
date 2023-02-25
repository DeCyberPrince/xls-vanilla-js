export function capitalize(str) {
  if (typeof str !== 'string') return capitalize(String(str))
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
    .fill('')
    .map((_, i) => start + i)
}

export function matrix($cellA, $cellB) {
  const [cellACoords, cellBCoords] = [
    getCellCoords($cellA),
    getCellCoords($cellB),
  ]
  const [rows, columns] = [
    range(cellACoords.row, cellBCoords.row),
    range(cellACoords.column, cellBCoords.column),
  ]
  return columns.reduce((acc, column) => {
    rows.forEach(row => acc.push(`${row}:${column}`))
    return acc
  }, [])
}

export function getCellCoords($cell) {
  const [row, column] = $cell.data.id.split(':')
  return { row: +row, column: +column }
}

export function nextSelector(currentCellCoords, keyCode) {
  let { row, column } = currentCellCoords
  switch (keyCode) {
    case 'ArrowUp':
      row--
      break
    case 'ArrowLeft':
      column--
      break
    case 'ArrowRight':
    case 'Tab':
      column++
      break
    case 'ArrowDown':
    case 'Enter':
      row++
  }
  if (row < 0) row = 0
  if (column < 0) column = 0
  return `[data-id="${row}:${column}"]`
}

export function storage(key, data = null) {
  if (!data) return JSON.parse(localStorage.getItem(key))
  localStorage.setItem(key, JSON.stringify(data))
}

storage.clear = (key) => {
  if (key) {
    localStorage.removeItem(key)
    return localStorage
  }
  localStorage.clear()
  return localStorage
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelCaseToKebabCase(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(stylesObj) {
  return Object.keys(stylesObj)
    .map(key => `${camelCaseToKebabCase(key)}: ${stylesObj[key]}`)
    .join('; ')
}

export function debounce(fn, ms) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
  }
}
