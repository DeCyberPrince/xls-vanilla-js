export function capitalize (str) {
  if (typeof str !== 'string') return capitalize(String(str))
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}
