import type { Plugin, Component } from 'vue'
import { defineComponent, createApp } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { color, text, border, background } from 'types/themes.json'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import { theme } from 'ant-design-vue'
import { createPinia } from 'pinia'
import type { AppParams } from 'types/index'

export default function buildApp(Root: Component, plugin: Plugin[] = []) {
  function setAppParams(params: AppParams) {
    useSessionStorage('app-params', params)

    window.localStorage.setItem('vueuse-color-scheme', params.dark ? 'dark' : 'auto')
  }
 
  const root = defineComponent({
    setup() {
      window.electron.on<AppParams>('async-params', (params) => setAppParams(params))

      document.onkeydown = function (e) {
        if (e.key === 'F12') {
          window.electron.send('open-dev-tool')
        }
      }

      const isDark = useDark()

      const antToken = computed(() => {
        const theme = isDark.value ? color.dark : color.default
        const targetColorTheme: Record<string, any> = {}

        Object.entries(theme).forEach((item) => {
          targetColorTheme[getCamelCase(`color-${item[0]}`)] = item[1]
          document.documentElement.style.setProperty(`--tw-${item[0]}`, item[1])
        })

        return targetColorTheme
      })

      watchEffect(() => {
        window.electron.send('set-theme', isDark.value)

        Object.entries((isDark.value ? text.dark : text.default) as Record<string, string>).forEach(
          (item) => {
            document.documentElement.style.setProperty(`--tw-text-${item[0]}`, item[1])
          }
        )

        Object.entries(
          (isDark.value ? border.dark : border.default) as Record<string, string>
        ).forEach((item) => {
          document.documentElement.style.setProperty(`--tw-border-${item[0]}`, item[1])
        })

        Object.entries(
          (isDark.value ? background.dark : background.default) as Record<string, string>
        ).forEach((item) => {
          document.documentElement.style.setProperty(`--tw-background-${item[0]}`, item[1])
        })
      })

      return () =>
        h(
          ConfigProvider,
          {
            theme: {
              algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm
            }
          },
          {
            default: () =>
              h(
                ConfigProvider,
                {
                  theme: {
                    token: antToken.value
                  }
                },
                {
                  default: () => h(Root)
                }
              )
          }
        )
    }
  })

  const app = createApp(root)

  for (let i = 0; i < plugin.length; i++) {
    app.use(plugin[i])
  }

  app.use(createPinia())

  return { app, setAppParams }
}

function getCamelCase(str: string) {
  return str.replace(/-([a-z])/g, function (all, i) {
    return i.toUpperCase()
  })
}
