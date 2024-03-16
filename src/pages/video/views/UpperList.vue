<script setup lang="ts">
import UpperCard from '../components/UpperCard.vue'
import { getUpperList, type Upper } from '@/apis/upper'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const appStore = useAppStore()
const uppers = ref<Upper[]>([])
const router = useRouter()

defineOptions({ name: 'UpperList' })
const { width, height, style } = useAppMainSize(16, 64)
const loading = ref(true)

async function createUpper() {
  await appStore.openCommonDialog('upperDetail', { width: 350, height: 430 })
  getUppers()
}

async function getUppers() {
  const data = await getUpperList()
  uppers.value = orderToData(data)
  loading.value = false
}

function orderToData(data: Upper[]) {
  if (appStore.appSettings.upperOrder[0] === '1') {
    return data.sort((a, b) => {
      return b.createTime - a.createTime
    })
  } else if (appStore.appSettings.upperOrder[0] === '2') {
    return data.sort((a, b) => {
      return a.createTime - b.createTime
    })
  } else if (appStore.appSettings.upperOrder[0] === '3') {
    return data.sort(function (a, b) {
      return a.name.localeCompare(b.name)
    })
  } else {
    return data.sort(function (a, b) {
      return -a.name.localeCompare(b.name)
    })
  }
}

function toUpper(id?: string) {
  router.push('/upper?id=' + id)
}

watch(
  () => appStore.appSettings.upperOrder,
  () => {
    uppers.value = orderToData(uppers.value)
  }
)

getUppers()
</script>

<template>
  <div>
    <view-tools title="PERFORMER LIST" :wrap-style="style">
      <a-dropdown placement="bottom" trigger="click">
        <a-button :icon="h(UnorderedListOutlined)"></a-button>

        <template #overlay>
          <a-menu
            :selected-keys="appStore.appSettings.upperOrder"
            @click="
              (args: any) => {
                appStore.appSettings.upperOrder = args.keyPath as string[]
              }
            "
          >
            <a-menu-item key="1">创建时间 - 由近到远</a-menu-item>
            <a-menu-item key="2">创建时间 - 由远到近</a-menu-item>
            <a-menu-item key="3">文件名 - 由A到Z</a-menu-item>
            <a-menu-item key="4">文件名 - 由Z到A</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-button class="ml-3" @click="createUpper">新建</a-button>
    </view-tools>

    <div :style="style">
      <card-list-wrap
        :loading="loading"
        :container-height="height"
        :container-width="width"
        :item-min-width="115"
        :column-gap="20"
        :row-gap="25"
        :pic-rate="1"
        :context-height="35"
        :items="uppers"
      >
        <template #default="{ items }">
          <UpperCard v-for="i in items" :upper="i" :key="i" @click="toUpper"></UpperCard>
        </template>

        <template #empty>
          <EmptyType1></EmptyType1>
        </template>
      </card-list-wrap>
    </div>
  </div>
</template>
