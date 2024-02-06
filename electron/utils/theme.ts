import { store } from '../store'

export function getBackground(dark = store.value.dark) {
  return dark ? '#000' : '#fff'
}
