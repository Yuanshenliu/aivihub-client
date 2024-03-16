<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'
import { getUpperDetail, type Upper } from '@/apis/upper'
import { resourceUrl } from '@/utils'
import { getCollectionPageList } from '@/apis/video'
import type { Collection } from 'types/index'
import CollectionList from '@/pages/upper/components/CollectionList.vue'
import SubmissionList from '@/pages/upper/components/SubmissionList.vue'

const { width, height, style } = useAppMainSize(20, 0)

const activeTab = ref('SubmissionList')
const loading = ref<boolean>(true)
const route = useRoute()
const appStore = useAppStore()
const upper = ref<Upper>()
const currentPage = ref(1)
const totalSize = ref(0)
const collectionList = ref<Collection[]>([])
const totalPages = ref(0)
const listComp = ref<
  InstanceType<typeof CollectionList> | InstanceType<typeof SubmissionList> | null
>(null)

const itemWrapHeight = computed(() => height.value - 173)

const comp: {
  [key: string]: any
} = {
  CollectionList,
  SubmissionList
}

const tab = [
  {
    label: '投稿',
    value: 'SubmissionList'
  },
  {
    label: '合集和列表',
    value: 'CollectionList'
  }
]

async function getDetail() {
  upper.value = await getUpperDetail({ id: route.query.id as string })
}

async function createCollection() {
  await appStore.openCommonDialog(
    'collection',
    { width: 350, height: 430 },
    { actress: route.query.id }
  )
  listComp.value?.reload()
}

function createSubmission() {
  appStore.openCommonDialog(
    'submission',
    {
      width: 700,
      height: 560
    },
    { actress: route.query.id }
  )
}

async function getCollectionList(pageIndex: number) {
  const { records, total, current, pages } = await getCollectionPageList({
    pageIndex,
    upper: route.query.id as string
  })
  totalSize.value = total
  currentPage.value = current
  collectionList.value = records
  totalPages.value = pages
}

Promise.all([getDetail(), getCollectionList(currentPage.value)]).then(() => {
  loading.value = false
})
</script>

<template>
  <div class="w-full bg-[#f1f2f3] dark:bg-[#232527]" :style="{ 'min-height': height + 'px' }">
    <div class="box-border flex h-[115px] w-full justify-center bg-regular px-8">
      <div class="profile-wrap flex h-full w-full justify-between">
        <div class="flex h-full items-center">
          <a-avatar
            v-if="!loading"
            :size="75"
            class="flex-shrink-0"
            :src="resourceUrl(upper?.avatar as string)"
          >
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>

          <div v-else class="loading-wrap h-[75px] w-[75px] flex-shrink-0 rounded-full"></div>

          <div class="ml-4 flex flex-col">
            <span v-if="!loading" class="line-clamp-2 text-lg text-regular">
              {{ upper?.name }}
            </span>
            <div v-else class="loading-wrap h-6 w-20"></div>

            <span v-if="!loading" class="mt-1 line-clamp-1 text-sm text-secondary">
              {{ upper?.description }}
            </span>

            <div v-else class="loading-wrap mt-2 h-4 w-60"></div>

            <div class="mt-2 text-sm"></div>
          </div>
        </div>

        <div class="flex h-full w-[255px] flex-shrink-0 items-center justify-end">
          <a-button
            v-if="!loading"
            size="small"
            class="mr-4"
            type="primary"
            @click="createSubmission"
            >投稿</a-button
          >
          <div v-else class="loading-wrap mr-4 h-6 w-[71px]"></div>

          <a-button v-if="!loading" size="small" type="primary" @click="createCollection"
            >创建合集</a-button
          >
          <div v-else class="loading-wrap h-6 w-[71px]"></div>
        </div>
      </div>
    </div>

    <div class="sticky top-0 flex justify-center bg-regular px-6">
      <div class="flex w-full">
        <Tabs
          :loading="loading"
          v-model="activeTab"
          :tabs="tab"
          class="no-drag"
          slider-cls="w-3 mb-0.5"
          tab-cls="text-[15px]"
        ></Tabs>
      </div>
    </div>

    <div :style="style" :class="{ 'bg-regular': loading }" class="flex justify-center">
      <FadeTransition>
        <keep-alive :include="['CollectionList', 'SubmissionList']">
          <component
            ref="listComp"
            :loading="loading"
            :itemWrapHeight="itemWrapHeight"
            :width="width"
            :upper-id="route.query.id as string"
            :is="comp[activeTab]"
          ></component>
        </keep-alive>
      </FadeTransition>
    </div>
  </div>
</template>
