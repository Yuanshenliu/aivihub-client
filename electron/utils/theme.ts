import { appParams } from '../store'

export function getBackground(dark = appParams.value.dark) {
  return dark ? '#000' : '#fff'
}
