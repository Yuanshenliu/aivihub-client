<script setup lang="ts">
import UpperCard from '@/views/video/components/UpperCard.vue'

defineOptions({ name: 'UpperList' })
const { width, height } = useAppMainSize(24, 64)

const { cardItem, loadingTotal } = useItem({
  containerWidth: width,
  containerHeight: height,
  itemMinWidth: 115,
  gapX: 20,
  gapY: 25,
  picRate: 3 / 4,
  contextHeight: 35
})
</script>

<template>
  <div class="px-3">
    <view-tools title="PERFORMER LIST" :gap-width="26">
      <a-button>新建</a-button>
    </view-tools>

    <div class="flex w-full flex-wrap" style="row-gap: 25px">
      <UpperCard v-for="i in loadingTotal" :key="i" :item-field="cardItem(i)"></UpperCard>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
