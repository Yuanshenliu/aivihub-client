<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'
defineProps<{ width: number; aspectRatio: number; src?: string }>()
const emit = defineEmits(['click'])
</script>

<template>
  <div
    v-if="!src"
    @click="emit('click')"
    :style="{ width: width + 'px', 'aspect-ratio': aspectRatio }"
    class="flex cursor-pointer items-center justify-center rounded border border-dashed border-regular"
  >
    <PlusOutlined class="text-2xl text-disabled" />
  </div>

  <div
    v-else
    @click="emit('click')"
    :style="{ width: width + 'px', 'aspect-ratio': aspectRatio, 'background-image': `url(${src})` }"
    style="background-position: center; background-size: cover"
    class="rounded border border-dashed border-regular"
  ></div>
</template>
