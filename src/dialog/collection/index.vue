<script setup lang="ts">
import type { Collection } from 'types/index'
import Schema from 'async-validator'
import type { Rules } from 'async-validator/dist-types/interface'
import { saveCollection } from '@/apis/video'

const error = ref('')
const saveLoading = ref(false)
const appStore = useAppStore()
const collection = ref<Collection>({})
const post = ref('')
const postBlob = ref<Blob>()

const params = inject<{ actress: string }>('common-dialog-params')

const channel = useBroadcastChannel({
  name: 'vueuse-demo-channel'
})

const descriptor: Rules = {
  title: { required: true, type: 'string', message: '标题不能为空' },
  poster: { required: true, message: '海报不能为空' }
}

function save(closeFun: Function) {
  error.value = ''

  const validator = new Schema(descriptor)
  validator.validate(
    { title: collection.value.title, poster: postBlob.value },
    { first: true },
    async (errors) => {
      if (errors) {
        error.value = errors?.[0].message as string
      } else {
        saveLoading.value = true

        const form = new FormData()
        form.append('title', collection.value.title as string)
        form.append('file', postBlob.value as Blob)
        form.append('upper', params?.actress as string)

        const task = await saveCollection(form)

        closeFun()
      }
    }
  )
}

async function selectImage() {
  try {
    const { blob, url } = await appStore.openImageCropDialog(1.778)
    post.value = url
    postBlob.value = blob
  } catch (e) {}
}
</script>

<template>
  <v-dialog title="创建合集">
    <template #subtitle>
      <span class="text-error">{{ error }}</span>
    </template>

    <div class="flex h-fit w-full flex-col">
      <a-form layout="vertical" class="w-[100%]">
        <a-form-item label="合集标题">
          <a-input v-model:value="collection.title"></a-input>
        </a-form-item>

        <a-form-item label="合集海报">
          <UploadImage
            :width="225"
            :aspect-ratio="1.778"
            @click="selectImage"
            :src="post"
          ></UploadImage>
        </a-form-item>
      </a-form>
    </div>

    <template #footer="{ close }">
      <a-button class="mr-3" @click="close">取消</a-button>
      <a-button :loading="saveLoading" type="primary" @click="save(close)">保存</a-button>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
