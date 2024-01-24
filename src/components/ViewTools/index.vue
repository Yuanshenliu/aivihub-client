<script setup lang="ts">
defineOptions({ name: 'ViewTools' })
const props = withDefaults(defineProps<{ title?: string; gapWidth?: number }>(), {
  title: '',
  gapWidth: 0
})

const { width } = useAppMainSize(props.gapWidth)
</script>

<template>
  <div class="h-14 w-full">
    <div
      class="fixed flex h-14 items-center justify-between bg-regular"
      :style="{ width: width + 'px' }"
    >
      <span class="text-primary">{{ title }}</span>
      <div><slot></slot></div>
    </div>
  </div>
</template>
