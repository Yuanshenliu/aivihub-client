import type { AppParams } from 'types/index'
import buildApp from '@/utils/entry-build'
import { RouterView } from 'vue-router'
import router from '@/router'

window.electron.invoke<AppParams>('init-app').then((params) => {
  const { app, setAppParams } = buildApp(
    defineComponent(() => {
      return () => h(RouterView)
    }),
    [router]
  )

  setAppParams(params)

  app.mount('#app')

  const appStore = useAppStore()
  appStore.token = params.token as string
})
