<script setup lang="ts">
import UploadList from './components/UploadList.vue'
import DownloadList from './components/DownloadList.vue'
import FinishList from './components/FinishList.vue'

const comp: {
  [key: string]: any
} = {
  UploadList,
  DownloadList,
  FinishList
}

const activeTab = ref('UploadList')
const navTabs = [
  {
    label: '上传',
    value: 'UploadList'
  },
  {
    label: '下载',
    value: 'DownloadList'
  },
  {
    label: '已完成',
    value: 'FinishList'
  }
]

const activeComponent = computed(() => comp[activeTab.value])
</script>

<template>
  <div class="page-wrap">
    <NavTabsWrap>
      <Tabs
        v-model="activeTab"
        :tabs="navTabs"
        class="no-drag"
        slider-cls="w-3 mb-0.5"
        tab-cls="text-[15px]"
      ></Tabs>
    </NavTabsWrap>

    <FadeTransition>
      <keep-alive :include="['UploadList']">
        <component :is="activeComponent"></component>
      </keep-alive>
    </FadeTransition>
  </div>
</template>

<style scoped lang="scss"></style>
