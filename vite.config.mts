import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import electron from 'vite-plugin-electron/simple'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: '.vite/dist',
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./html/home.html', import.meta.url)),
        login: fileURLToPath(new URL('./html/login.html', import.meta.url)),
        dialog: fileURLToPath(new URL('./html/dialog.html', import.meta.url))
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    electron({
      main: {
        entry: fileURLToPath(new URL('./electron/main.ts', import.meta.url)),
        vite: {
          resolve: {
            alias: {
              'types': fileURLToPath(new URL('./types', import.meta.url))
            }
          },
          build: {
            outDir: '.vite/build'
          }
        }
      },
      preload: {
        input: fileURLToPath(new URL('./electron/preload.ts', import.meta.url)),
        vite: {
          build: {
            outDir: '.vite/build'
          }
        }
      }
    }),
    AutoImport({
      dts: 'types/auto-imports.d.ts',
      include: [/\.[tj]sx?$/, /\.vue$/],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          '@/composables': [
            'useItem', 'useAppMainSize'
          ]
        },
        {
          '@/stores': [
            'useAppStore'
          ]
        }
      ]
    }),
    Components({
      extensions: ['vue', 'md', 'tsx'],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      dirs: ['src/components'],
      dts: 'types/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    }),
    createSvgIconsPlugin({
      iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'types': fileURLToPath(new URL('./types', import.meta.url))
    }
  }
})
