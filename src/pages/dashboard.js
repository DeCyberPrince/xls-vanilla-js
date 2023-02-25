import { storage } from '@core/utils'

function toHTML(storageKey) {
  const table = storage(storageKey)
  const id = storageKey.split(':')[1]
  const lastOpened = new Date(+table.lastOpened).toLocaleDateString('ru')
  return `
  <li class="dashboard__record">
    <a href="#excel/${id}">${table.title}</a>
    <strong>${lastOpened}</strong>
  </li> 
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.startsWith('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function getRecords() {
  const keys = getAllKeys()
  if (!keys.length) {
    return '<p>No records found</p>'
  }
  return `
  <div class="dashboard__list-header">
    <span>Name</span>
    <span>Last upload</span>
  </div>
  <ul class="dashboard__list">
    ${keys.map(toHTML).join('')}
  </ul>
  `
}
