import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const token = ref<string>('')
  const searching = ref<boolean>(false)

  const showNavTab = computed(() => {
    return !searching.value
  })

  return { token, searching, showNavTab }
})
