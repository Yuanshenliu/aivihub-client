<script setup lang="ts">
import type { UploadTask } from '../../../../electron/upload/uploadTask'
const defaultPercent = ref<number>(50)
const isDark = useDark()

const selected = ref(false)
const props = defineProps<{ task: UploadTask }>()

const strokeColor = computed(() => {
  if (isDark.value) {
    return {
      '0%': '#d44e7d',
      '100%': '#c07b93'
    }
  }

  return {
    '0%': '#ff82ab',
    '100%': '#eaaac0'
  }
})

const title = computed(() => {
  const idx = props.task.path.lastIndexOf('\\') + 1
  return props.task.path.substring(idx)
})
</script>

<template>
  <div
    class="flex h-[88px] w-full cursor-pointer items-center rounded-md px-2 pr-3 hover:bg-[#f5f6f7] hover:dark:bg-[#232527]"
    :class="{ selected: selected }"
  >
    <div class="flex h-full w-[58px] items-center justify-center">
      <svg-icon name="video-file" class="text-[48px]"></svg-icon>
    </div>

    <div class="flex h-full flex-1 flex-col items-start justify-center px-4">
      <span class="flex w-full text-[13px]">
        <span class="line-clamp-1 text-regular">
          极品爆乳鲜嫩美穴貌美尤物▌苏美奈▌家政女仆的肉体服务 肏到羞耻喷汁
        </span>
      </span>

      <div
        class="relative top-1.5 mt-1 flex w-full items-center justify-between text-xs text-secondary"
      >
        <span>0/30GB</span>

        <span>已暂停</span>
      </div>

      <div class="w-full">
        <a-progress
          :stroke-color="strokeColor"
          size="small"
          :percent="defaultPercent"
          class="mb-0"
          :show-info="false"
        />
      </div>
    </div>

    <div class="flex h-full w-fit flex-shrink-0 items-center pl-4">
      <div class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full">
        <svg-icon
          name="play"
          class="text-[#898e97] hover:text-[#272a2f] dark:hover:text-[#b5b5b5]"
        ></svg-icon>
      </div>

      <div class="ml-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full">
        <svg-icon
          name="close2"
          class="text-[#898e97] hover:text-[#272a2f] dark:hover:text-[#b5b5b5]"
        ></svg-icon>
      </div>

      <div class="ml-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full">
        <svg-icon
          name="folder"
          class="text-[#898e97] hover:text-[#272a2f] dark:hover:text-[#b5b5b5]"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.ant-progress) {
  height: 9px !important;
}

.selected {
  background: rgba(255, 130, 171, 0.08);
}
</style>
