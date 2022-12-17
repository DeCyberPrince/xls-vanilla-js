export function parse(value = '') {
  if (value.startsWith('=')) {
    // eslint-disable-next-line no-eval
    return eval(value.slice(1))
  }
  return value
}
