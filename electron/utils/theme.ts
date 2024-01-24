import { store } from '../store'

export function getBackground(dark = store.value.dark) {
  return dark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'
}
