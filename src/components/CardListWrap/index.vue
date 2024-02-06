<script setup generic="T extends []" lang="ts">
import type { Component, VNode } from 'vue'
import { chunk, fill } from 'lodash-es'

defineOptions({ name: 'CardListWrap' })

const props = defineProps<{
  containerWidth: number
  containerHeight: number
  itemMinWidth: number
  rowGap: number
  columnGap: number
  picRate: number
  contextHeight: number
  loading?: boolean
  items?: T
}>()

const slots = defineSlots<{
  default(props: { items?: T }): VNode[]
}>()
const defaultSlot = ref<Component[]>([])
const compList = ref<Component[][]>([])

const itemNumber = computed<number>(() => {
  const x = (props.containerWidth + props.columnGap) / (props.columnGap + props.itemMinWidth)
  return Math.ceil(x)
})

const itemWidth = computed<number>(() => {
  return (props.containerWidth - props.columnGap * (itemNumber.value - 1)) / itemNumber.value
})

function itemColNum(): number {
  const imgH = itemWidth.value / props.picRate
  return Number(Math.ceil(props.containerHeight / (imgH + props.contextHeight + props.rowGap)))
}

defaultSlot.value = slots.default({
  items: fill(Array(itemColNum() * itemNumber.value), {}) as T
})

const itemStyle = (itemIndex: number) => {
  return {
    width: itemWidth.value + 'px',
    marginLeft: itemIndex === 0 ? 0 : props.rowGap / 2 + 'px',
    marginRight: itemIndex === itemNumber.value - 1 ? 0 : props.rowGap / 2 + 'px',
    '--poster-aspect-ratio': props.picRate
  }
}

watch(
  () => props.loading,
  (value) => {
    value && (defaultSlot.value = slots.default({ items: props.items }))
  }
)

watchEffect(function () {
  // @ts-ignore
  compList.value = chunk<Component>(defaultSlot.value[0].children, itemNumber.value)
})
</script>

<template>
  <div class="h-fit w-full" :style="{ width: containerWidth + 'px' }">
    <div
      v-for="(row, rowIndex) in compList"
      :key="rowIndex"
      class="flex"
      :style="{ marginBottom: rowGap + 'px' }"
    >
      <div v-for="(item, index) in row" :key="index" :style="itemStyle(index)">
        <component :is="item"></component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
