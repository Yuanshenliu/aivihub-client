<script setup lang="ts">
import { updateScrollView } from '@/components/Scrollbar/index'

const itemRefs = ref<HTMLButtonElement[]>([])
const content = ref<HTMLDivElement>()
const sliderLeft = ref<number>()

const emit = defineEmits(['update:modelValue'])

defineOptions({ name: 'Tabs' })

interface Props {
  modelValue: string
  tabs: Array<{ label: string; value: string }>
  position?: string
  sliderCls?: string
  tabCls?: string
  disabled?: boolean
  loading?: boolean
}

const updateScrollViewFn = inject<() => void>(updateScrollView)

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const select = (item: string | number) => {
  if (!content.value?.getBoundingClientRect()) return
  emit('update:modelValue', item)

  const { left } = content.value?.getBoundingClientRect() as DOMRect

  const target = itemRefs.value.find((i) => {
    return i.dataset.tab === item
  })

  const clientRect = target?.getBoundingClientRect()

  const offsetLeft = (clientRect?.left || 0) - left
  sliderLeft.value = offsetLeft + (clientRect?.width || 0) / 2
  updateScrollViewFn && updateScrollViewFn()
}

onMounted(() => {
  select(props.modelValue || props?.tabs[0]!.value)
})

watch(
  () => [props.modelValue, props.tabs],
  () => {
    select(props.modelValue)
  }
)

watchEffect(function () {
  if (!props.loading) {
    select(props.modelValue)
  }
})
</script>

<template>
  <div class="flex h-fit w-full bg-transparent" :class="'justify-' + position">
    <div class="tabs-content relative h-12 w-fit bg-transparent" ref="content">
      <template v-if="!loading">
        <button
          v-for="item in tabs"
          :disabled="disabled"
          ref="itemRefs"
          class="h-full px-4"
          :key="item?.value"
          :data-tab="item?.value"
          :class="[item?.value === modelValue ? 'tab__active_btn' : 'tab__disActive_btn', tabCls]"
          @click="select(`${item?.value}`)"
        >
          {{ item?.label }}
        </button>
      </template>

      <template v-else>
        <div class="flex h-full w-fit items-center justify-center">
          <div
            class="loading-wrap mx-4 inline-block h-6 w-[70px] px-4"
            v-for="item in tabs"
            :key="item.value"
          ></div>
        </div>
      </template>

      <div
        v-if="!loading"
        class="tab__slider absolute bottom-0 h-0.5 rounded"
        :class="sliderCls"
        :style="{ left: sliderLeft + 'px' }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  background: transparent;
  border: transparent;
  cursor: pointer;
}

.tab__slider {
  height: 3px;
  transform: translate3d(-50%, 0, 0);
  transition: left 250ms;
}

.tab__active_btn {
  @apply text-primary;
}

.tab__disActive_btn {
  @apply text-regular;
}

.tab__slider {
  @apply bg-primary;
}
</style>
