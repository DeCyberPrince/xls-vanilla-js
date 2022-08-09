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
  const [cellACoords, cellBCoords] = [$cellA.data.id, $cellB.data.id]
    .map(id => ({
      row: +id.split(':')[0],
      column: +id.split(':')[1],
    }))
  const rows = range(cellACoords.row, cellBCoords.row)
  const columns = range(cellACoords.column, cellBCoords.column)
  return columns.reduce((acc, column) => {
    rows.forEach(row => acc.push(`${row}:${column}`))
    return acc
  }, [])
}
