<script setup lang="ts">
import UpperList from '@/views/video/views/UpperList.vue'
import VideoList from '@/views/video/views/VideoList.vue'

defineOptions({ name: 'videoPage' })

const comp: {
  [key: string]: any
} = {
  UpperList,
  VideoList
}

const activeTab = ref('UpperList')
const navTabs = [
  {
    label: '列表1',
    value: 'UpperList'
  },
  {
    label: '列表2',
    value: 'VideoList'
  }
]

const activeComponent = computed(() => comp[activeTab.value])
</script>

<template>
  <page-wrap>
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
      <keep-alive :include="['UpperList']">
        <component :is="activeComponent"></component>
      </keep-alive>
    </FadeTransition>
  </page-wrap>
</template>
