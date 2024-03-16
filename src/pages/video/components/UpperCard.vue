<script setup lang="ts">
import type { UpperField } from 'types/index'
import { resourceUrl } from '@/utils'

defineOptions({ name: 'UpperCard' })
const props = defineProps<{ upper?: UpperField }>()
const emit = defineEmits<{
  click: [id?: string]
}>()

const post = computed(() => {
  if (!props.upper?.id) {
    return {}
  }
  return {
    'background-image': `url(${resourceUrl(props.upper?.avatar as string)})`
  }
})
</script>

<template>
  <div class="h-fit w-full cursor-pointer" @click="emit('click', upper?.id)">
    <div
      class="card-item-poster"
      style="background-position: center; background-size: cover"
      :style="post"
      :class="{ 'loading-wrap': !upper?.id }"
    ></div>

    <div class="flex h-[35px] w-full items-center text-center text-[12px]">
      <span class="w-full truncate px-1 text-center" v-if="upper?.id">
        {{ upper?.name }}
      </span>

      <div class="loading-wrap h-[16px] w-full" v-else></div>
    </div>
  </div>
</template>
