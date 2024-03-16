<script setup lang="ts">
import type { Collection, SubmissionVideo } from 'types/index'
import { resourceUrl } from '@/utils'

defineOptions({ name: 'VideoItemCard' })

const props = defineProps<{
  type?: 'collection' | 'video'
  entry?: Collection & SubmissionVideo
}>()

const post = computed(() => {
  if (!props.entry?.id) {
    return {}
  }
  return {
    'background-image': `url(${resourceUrl(props.entry?.poster as string)})`
  }
})
</script>

<template>
  <div class="h-fit w-full cursor-pointer">
    <div
      class="card-item-poster relative overflow-hidden"
      style="background-position: center; background-size: cover"
      :style="post"
      :class="{ 'loading-wrap': !entry?.id, 'poster-wrap': !!entry?.id }"
    >
      <div class="bg-tit h-15 absolute bottom-0 left-0 w-full text-[12px]">
        <div class="flex justify-between px-2 py-1.5 text-warmGray-50" v-if="type === 'collection'">
          <span>8个内容</span>
          <span>合集</span>
        </div>

        <div v-else class="flex justify-between px-2 py-1.5 text-warmGray-50"></div>
      </div>
    </div>

    <div
      class="flex h-fit w-full flex-col items-start px-0.5 text-center text-[12px]"
      v-if="entry?.id"
    >
      <div
        class="vi-title flex h-[55px] w-full items-center"
        :style="{ height: type === 'collection' ? '35px' : '55px' }"
      >
        <span
          class="vd-title mt-1 text-[15px]"
          :class="[type === 'collection' ? 'line-clamp-1' : 'line-clamp-2']"
        >
          {{ entry?.title }}
        </span>
      </div>

      <div
        class="mt-1 flex w-full items-center justify-between text-secondary"
        v-if="type !== 'collection'"
      >
        <div class="sub-context flex h-full w-fit items-center">
          <span class="up-icon h-fit w-fit rounded px-1 text-[9px]"> UP </span>
          <span class="ml-2 flex items-center text-[11px]">
            <span>猿叔史记</span>
            <i class="dot mx-1"></i>
            <span class="text-xs">2024-10-5</span>
          </span>
        </div>
      </div>

      <div v-else class="mt-1 flex w-full items-center justify-between text-secondary">
        <span class="text-xs">2024-10-5</span>
      </div>
    </div>

    <div class="flex h-[35px] w-full flex-col items-center text-center text-[12px]" v-else>
      <div class="loading-wrap mt-2 h-[28px] w-full"></div>
      <div class="loading-wrap mt-1 h-[20px] w-full"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.poster-wrap {
  @apply rounded;
  transition: transform 0.25s;

  &:hover {
    transform: scale3d(1.09, 1.09, 1);
  }
}

.vi-title {
  @apply text-regular;
  transition: color 0.15s;

  &:hover {
    @apply text-primary;
  }
}

.bg-tit {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
}
</style>
