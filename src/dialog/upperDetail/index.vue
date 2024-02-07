<script setup lang="ts">
import type { UpperField } from 'types/index'
import { UserOutlined } from '@ant-design/icons-vue'
import { saveUpper } from '@/apis/upper'

const params = inject<{ upperID?: string }>('common-dialog-params')
const dialogRef = ref()
const error = ref('')
const appStore = useAppStore()
const avatar = ref('')
const saveLoading = ref(false)

const upper = reactive<UpperField>({
  id: '',
  name: '',
  description: '',
  createTime: '',
  avatar: ''
})

async function selectAvatar() {
  try {
    const { blob, url } = await appStore.openImageCropDialog(1)
    avatar.value = url
    upper.avatar = blob
  } catch (e) {}
}

async function save(close: Function) {
  saveLoading.value = true
  const form = new FormData()

  form.append('name', upper.name)
  form.append('description', upper.description)
  form.append('file', upper.avatar)

  await saveUpper(form)
}
</script>

<template>
  <v-dialog ref="dialogRef" :title="params?.upperID ? '优优详情' : '新建优优'">
    <template #subtitle>
      <span>{{ error }}</span>
    </template>

    <div class="flex h-fit w-full flex-col">
      <a-form layout="vertical" class="w-[100%]">
        <a-form-item label="优优名称">
          <a-input v-model:value="upper.name"></a-input>
        </a-form-item>

        <a-form-item label="优优描述">
          <a-input v-model:value="upper.description"></a-input>
        </a-form-item>

        <a-form-item label="优优头像">
          <a-avatar
            :size="64"
            shape="square"
            class="cursor-pointer"
            @click="selectAvatar"
            :src="avatar"
          >
            <UserOutlined />
          </a-avatar>
        </a-form-item>
      </a-form>
    </div>

    <template #footer="{ close }">
      <a-button class="mr-3" @click="close">取消</a-button>
      <a-button type="primary" @click="save(close)">保存</a-button>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
