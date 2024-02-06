<script setup lang="ts">
import type { LoginField } from '@/apis/user'
import { login } from '@/apis/user'
import { encrypt } from '@/utils/rsa-encrypt'

defineOptions({ name: 'UsernameAndPasswordLogin' })

const loginForm = reactive<LoginField & { rememberMe?: boolean }>({
  username: 'admin',
  password: '123456'
})

const loading = ref(false)

async function submit() {
  loading.value = true
  const token = await login({
    username: loginForm.username,
    password: encrypt(loginForm.password || '') as string
  })
  loading.value = false
  window.electron.send('logged', token)
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center">
    <div class="mt-1 flex h-fit w-full flex-col">
      <a-form layout="vertical">
        <a-form-item label="用户名">
          <a-auto-complete
            size="large"
            v-model:value="loginForm.username"
            :disabled="loading"
          ></a-auto-complete>
        </a-form-item>

        <a-form-item label="密码">
          <a-input
            size="large"
            type="password"
            v-model:value="loginForm.password"
            :disabled="loading"
          ></a-input>
        </a-form-item>

        <a-form-item>
          <a-checkbox :disabled="loading" v-model:checked="loginForm.rememberMe">记住我</a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button :loading="loading" class="w-full" size="large" type="primary" @click="submit">
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.ant-form-item) {
  margin-bottom: 10px;
}
</style>
