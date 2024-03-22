<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'
import { getCollectionTextList, getSubmissionTag, createSubmissionTag } from '@/apis/video'
import type { Collection, SubmissionTag, SubmissionVideo } from 'types/index'
const error = ref<string>('')

const collection = ref<Collection[]>()
const submissionTag = ref<SubmissionTag[]>()

const appStore = useAppStore()
const saveLoading = ref(false)
const post = ref('')
const postBlob = ref<Blob>()
const videoSize = ref<number>(0)
const videoExtensionName = ref<string>()
const params = inject<{ actress: string }>('common-dialog-params')

const videoPath = ref('')
const tags = ref<{ label: string; value: string }[]>([])
const submissionVideo = ref<SubmissionVideo>({
  title: '',
  description: '',
  serialNumber: '',
  manufacturer: '',
  collection: ''
})

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true
    }
  },
  render() {
    return this.vnodes
  }
})

const newTag = ref('')

async function getCollections() {
  collection.value = await getCollectionTextList()
}

async function getSubmissionTags() {
  submissionTag.value = await getSubmissionTag()
}

function addItem() {
  if (!submissionTag.value?.some((item) => item.title === newTag.value)) {
    if (newTag.value) {
      submissionTag.value?.push({
        id: new Date().getTime(),
        title: newTag.value
      })
    }
  }
}

async function save(closeFn: Function) {
  const form = new FormData()
  form.append('title', submissionVideo.value.title)
  form.append('description', submissionVideo.value.description)
  form.append('serialNumber', submissionVideo.value.serialNumber)
  form.append('manufacturer', submissionVideo.value.manufacturer)
  form.append('collection', submissionVideo.value.collection as string)
  form.append('file', postBlob.value as Blob)
  form.append('videoPath', videoPath.value)
  form.append('videoSize', `${videoSize.value}`)
  form.append('videoExtensionName', videoExtensionName.value as string)
  form.append('upper', params?.actress as string)
  form.append(
    'totalChunk',
    `${Math.ceil(videoSize.value / import.meta.env.VITE_UPLOAD_CHUNK_SIZE)}`
  )

  tags.value.forEach((item, index) => {
    form.append(`tags[${index}].value`, item.value)
    form.append(`tags[${index}].label`, item.label)
  })

  const task = await createSubmissionTag(form)
  window.electron.send('add-upload-task', {
    ...task,
    ...{ type: 'media', taskID: new Date().getTime().toString() }
  })

  closeFn()
}

async function selectImage() {
  try {
    const { blob, url } = await appStore.openImageCropDialog(1.778)
    post.value = url
    postBlob.value = blob
  } catch (e) {}
}

async function selectVideo() {
  const { path, size, extensionName } = await window.electron.invoke<{
    path: string
    size: number
    extensionName: string
  }>('select-video')
  videoPath.value = path
  videoSize.value = size
  videoExtensionName.value = extensionName
}

function tagChange(value: any, option: any) {
  tags.value = option
}

getCollections()
getSubmissionTags()
</script>

<template>
  <v-dialog title="创建投稿">
    <template #subtitle>
      <span class="text-error">{{ error }}</span>
    </template>

    <div class="h-fit w-full">
      <a-form>
        <a-row :gutter="24">
          <a-col span="24">
            <a-form-item label="影片标题">
              <a-input v-model:value="submissionVideo.title"></a-input>
            </a-form-item>
          </a-col>

          <a-col span="24">
            <a-form-item label="影片简介">
              <a-input v-model:value="submissionVideo.description"></a-input>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item label="影片番号">
              <a-input v-model:value="submissionVideo.serialNumber"></a-input>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item label="影片厂商">
              <a-input v-model:value="submissionVideo.manufacturer"></a-input>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item label="选择合集">
              <a-select allowClear v-model:value="submissionVideo.collection">
                <a-select-option v-for="item in collection" :value="item.id" :key="item.id">{{
                  item.title
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item label="影片标签">
              <a-select
                :listHeight="135"
                mode="multiple"
                max-tag-count="responsive"
                @change="tagChange"
                :options="submissionTag?.map((item) => ({ value: item.id, label: item.title }))"
              >
                <template #dropdownRender="{ menuNode: menu }">
                  <v-nodes :vnodes="menu" />
                  <a-divider style="margin: 4px 0" />

                  <a-space style="padding: 4px 8px">
                    <a-input
                      ref="inputRef"
                      v-model:value="newTag"
                      placeholder="Please enter item"
                    />

                    <a-button type="text" @click="addItem">
                      <template #icon>
                        <plus-outlined />
                      </template>
                      新增
                    </a-button>
                  </a-space>
                </template>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col span="24" class="medi">
            <a-form-item label="添加影片">
              <a-button size="small" @click="selectVideo">选择影片</a-button>

              <template #help>
                <span class="line-clamp-1 text-xs">{{ videoPath }}</span>
              </template>
            </a-form-item>
          </a-col>

          <a-col span="24" class="medi">
            <a-form-item label="添加海报"> </a-form-item>

            <UploadImage
              :width="200"
              :aspect-ratio="1.778"
              @click="selectImage"
              :src="post"
            ></UploadImage>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <template #footer="{ close }">
      <a-button class="mr-3" @click="close">取消</a-button>
      <a-button :loading="saveLoading" type="primary" @click="save(close)">保存</a-button>
    </template>
  </v-dialog>
</template>

<style lang="scss">
.medi {
  .ant-form-item {
    margin-bottom: 5px !important;
  }

  .ant-row {
    align-items: flex-start;
  }
}

.preview {
  aspect-ratio: 1.778;
}
</style>
