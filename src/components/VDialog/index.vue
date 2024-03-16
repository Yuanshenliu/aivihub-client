<script setup lang="ts">
defineProps<{
  title?: string
}>()

const name = inject<string>('dialog-name')

const commonDialog = useStorage('common-dialog', { dialogName: '' })

async function closeWindow(args: Record<string, any> = {}) {
  commonDialog.value = null
  window.electron.send('close-dialog', { name, ...args })
}
</script>

<template>
  <div class="relative h-full w-full bg-regular px-6 py-1">
    <div class="drag flex h-[72px] w-full items-center justify-between text-regular">
      <div class="relative flex h-full flex-1 flex-col justify-center">
        <span class="text-[16px]">{{ title }}</span>

        <span class="mt-1 w-full text-[11px]">
          <slot name="subtitle"></slot>
        </span>
      </div>

      <div class="flex h-full w-[38px] flex-shrink-0 items-center justify-center">
        <div
          class="no-drag flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
          @click="closeWindow"
        >
          <SvgIcon name="close"></SvgIcon>
        </div>
      </div>
    </div>

    <div class="w-full">
      <slot></slot>
    </div>

    <div
      class="align-center absolute bottom-0 left-0 flex h-fit w-full justify-end px-4 py-5"
      id="dialog-footer"
    >
      <slot name="footer" :close="closeWindow"></slot>
    </div>
  </div>
</template>
