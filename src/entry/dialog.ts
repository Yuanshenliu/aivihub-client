import type { AppParams, CommonDialogField } from 'types/index'
import buildApp from '@/utils/entry-build'

const dialogModules = import.meta.glob('@/dialog/**/*.vue')

const commonDialog = useStorage<CommonDialogField>('common-dialog', {})

window.electron.invoke<AppParams>('init-app').then((params) => {
  dialogModules[`/src/dialog/${commonDialog.value.name}/index.vue`]().then((module) => {
    const { app, setAppParams } = buildApp(
      defineComponent(() => {
        provide('common-dialog-params', commonDialog.value.params)
        provide('dialog-name', commonDialog.value.name)
        return () => h((module as any).default)
      })
    )

    setAppParams(params)

    app.mount('#app')
    const appStore = useAppStore()
    appStore.token = params.token as string
  })
})
