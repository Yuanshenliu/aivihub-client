<script setup lang="ts">
defineOptions({ name: 'ViewTools' })
withDefaults(
  defineProps<{ title?: string; gapWidth?: number; wrapStyle?: Record<string, any> }>(),
  {
    title: '',
    gapWidth: 0
  }
)
</script>

<template>
  <div class="h-14 w-full">
    <div class="fixed flex h-14 items-center justify-between bg-regular" :style="wrapStyle">
      <slot name="title">
        <span class="text-primary">{{ title }}</span>
      </slot>

      <div><slot></slot></div>
    </div>
  </div>
</template>
