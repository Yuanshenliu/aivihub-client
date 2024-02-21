<script setup lang="ts">
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
  items?: any[]
}>()

const slots = defineSlots<{
  default(props: { items?: any[] }): VNode[]
  empty(): any
}>()

const defaultSlot = ref<Component[]>([])
const compList = ref<Component[][]>([])
const empty = slots.empty()

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


const itemStyle = (itemIndex: number) => {
  return {
    width: itemWidth.value + 'px',
    marginLeft: itemIndex === 0 ? 0 : props.rowGap / 2 + 'px',
    marginRight: itemIndex === itemNumber.value - 1 ? 0 : props.rowGap / 2 + 'px',
    '--poster-aspect-ratio': props.picRate
  }
}

watchEffect(function() {
  if(props.loading) {
    defaultSlot.value = slots.default({
      items: fill(Array(itemColNum() * itemNumber.value), {}) as T
    })
  }else{    
    defaultSlot.value = slots.default({
      items: props.items
    })
  }
})

watchEffect(function () {
  // @ts-ignore
  compList.value = chunk<Component>(defaultSlot.value[0].children, itemNumber.value)
})
</script>

<template>
  <div v-if="loading || compList.length" class="h-fit w-full" :style="{ width: containerWidth + 'px' }">
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

  <div v-else class="w-full" :style="{height: containerHeight + 'px'}">
    <component :is="empty[0]"></component>
  </div>
</template>

<style scoped lang="scss"></style>
