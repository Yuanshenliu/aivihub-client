<script setup lang="ts">
import { h } from 'vue'
import { ArrowDownOutlined, PauseOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import TransmissionItem from './TransmissionItem.vue'

const defaultPercent = ref<number>(50)
const showDrawer = ref(false)
</script>

<template>
  <div class="relative w-full pt-[64px]">
    <div
      class="absolute top-0 flex h-[64px] w-full items-center bg-[#ffffff] px-6 dark:bg-[#17181a]"
    >
      <span class="flex-shrink-0 text-[13px] text-regular">上传总进程：</span>

      <a-progress
        :percent="defaultPercent"
        class="mb-0 ml-2"
        :show-info="false"
        strokeColor="#f0f0f0"
      />

      <div class="ml-5 flex items-center">
        <a-button class="ml-4" :icon="h(ArrowDownOutlined)"></a-button>
        <a-button class="ml-4" :icon="h(PauseOutlined)"></a-button>
        <a-button class="ml-4" :icon="h(DeleteOutlined)"></a-button>
      </div>
    </div>

    <div class="w-full px-3">
      <TransmissionItem></TransmissionItem>
    </div>

    <a-drawer
      :width="350"
      title="Basic Drawer"
      placement="right"
      v-model:open="showDrawer"
    ></a-drawer>
  </div>
</template>

<style scoped lang="scss"></style>
