<script setup lang="ts">
import SwitchMode from '@/utils/switch-model'

defineOptions({ name: 'sidebarComp' })

const route = useRoute()
const router = useRouter()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const sm = (ev: Event) => {
  // @ts-ignore
  SwitchMode(ev.target, isDark, () => {
    toggleDark()
  })
}
</script>

<template>
  <div class="av-sidebar drag flex-shrink-0">
    <div class="flex flex-col items-center">
      <div class="back flex w-full items-center justify-center">
        <div
          class="no-drag mt-2 flex cursor-pointer rounded-lg p-1 text-secondary hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          <svg-icon name="left" class="cursor-pointer text-lg"></svg-icon>
        </div>
      </div>

      <div
        class="no-drag mt-3 flex cursor-pointer flex-col items-center text-secondary"
        :class="{ '!text-primary': route.meta.type === 'home' }"
        @click="router.push({ name: 'Home' })"
      >
        <svg-icon name="home" class="text-[25px]" />
        <span class="mt-1.5 text-xs">首页</span>
      </div>

      <div
        class="no-drag text-sideBar mt-7 flex cursor-pointer flex-col items-center text-secondary"
        :class="{ '!text-primary': route.meta.type === 'video' }"
        @click="router.push({ name: 'Video' })"
      >
        <svg-icon name="video" class="text-[22px]" />
        <span class="mt-1.5 text-xs">视频</span>
      </div>

      <div
        class="no-drag text-sideBar mt-7 flex cursor-pointer flex-col items-center text-secondary"
        :class="{ '!text-primary': route.meta.type === 'image' }"
        @click="router.push({ name: 'Creator' })"
      >
        <svg-icon name="image" class="text-[20px]" />
        <span class="mt-1.5 text-xs">图片</span>
      </div>
    </div>

    <div class="mb-8 flex flex-col items-center text-regular">
      <div
        class="no-drag mb-7 cursor-pointer text-[24px]"
        :class="{ '!text-primary': route.meta.type === 'transmission' }"
      >
        <svg-icon name="upload" />
      </div>

      <div
        class="no-drag mb-7 cursor-pointer"
        :class="isDark ? 'text-[23px]' : 'text-[18px]'"
        @click="sm"
      >
        <div class="flex h-[24px] w-[24px] items-center justify-center">
          <svg-icon :name="isDark ? 'sun' : 'moon'" />
        </div>
      </div>

      <div class="no-drag text- cursor-pointer text-[20px]">
        <svg-icon name="settings" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module';
@import '@/styles/index';

.av-sidebar {
  @apply flex h-full flex-col items-center justify-between bg-[#f6f7f8] dark:bg-[#1e2022];
  width: $sideBarWidth;

  .back {
    height: $navbarHeight;
  }

  &__icon {
    @apply text-regular;
  }
}
</style>
