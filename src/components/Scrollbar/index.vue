<script setup lang="ts">
import Bar from './Bar.vue'
import { updateScrollView } from './index'

defineOptions({ name: 'ScrollBar' })
defineProps<{ viewClass?: string; viewStyle?: Record<string, any> }>()

const wrap = ref<HTMLDivElement>()
const view = ref<HTMLDivElement>()
const sizeWidth = ref('0')
const sizeHeight = ref('0')
const moveX = ref(0)
const moveY = ref(0)
provide('wrap', wrap)

const route = useRoute()

const update = () => {
  let heightPercentage = (wrap.value!.clientHeight * 100) / wrap.value!.scrollHeight
  let widthPercentage = (wrap.value!.clientWidth * 100) / wrap.value!.scrollWidth
  sizeHeight.value = heightPercentage < 100 ? heightPercentage + '%' : ''
  sizeWidth.value = widthPercentage < 100 ? widthPercentage + '%' : ''
}

const handleScroll = () => {
  moveY.value = (wrap.value!.scrollTop * 100) / wrap.value!.clientHeight
  moveX.value = (wrap.value!.scrollLeft * 100) / wrap.value!.clientWidth
}

onMounted(() => {
  view.value!.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  view.value!.removeEventListener('resize', update)
})

watch(
  () => route,
  () => {
    nextTick(update)
  },
  {
    deep: true,
    immediate: true
  }
)

provide(updateScrollView, () => {
  setTimeout(() => update(), 250)
})
</script>

<template>
  <div class="scrollbar">
    <div class="scrollbar__wrap" ref="wrap" @scroll="handleScroll">
      <div class="scrollbar__view relative" ref="view" :class="viewClass" :style="viewStyle">
        <slot></slot>
      </div>
    </div>
    <Bar :move="moveX" :size="sizeWidth"></Bar>
    <Bar :move="moveY" :size="sizeHeight" vertical></Bar>
  </div>
</template>

<style lang="scss">
.scrollbar {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 999;

  &:hover,
  &:active,
  &:focus {
    > .scrollbar__bar {
      opacity: 1;
      transition: opacity 340ms ease-out;
    }
  }

  &__wrap {
    overflow: scroll;
    height: 100%;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  &__view {
    width: 100%;
    height: fit-content;
  }

  .scrollbar__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 120ms ease-out;

    &.is-vertical {
      width: 6px;
      top: 2px;

      > div {
        width: 100%;
      }
    }

    &.is-horizontal {
      height: 6px;
      left: 2px;

      > div {
        height: 100%;
      }
    }
  }

  .scrollbar__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(#909399, 0.3);
    transition: 0.3s background-color;
    z-index: 9999;

    &:hover {
      background-color: rgba(#909399, 0.5);
    }
  }
}
</style>
