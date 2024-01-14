import buildApp from '@/utils/entry-build'
import Login from '@/views/login/index.vue'

const { app } = buildApp(
  defineComponent({
    setup() {
      return () => h(Login)
    }
  })
)

app.mount('#app')
