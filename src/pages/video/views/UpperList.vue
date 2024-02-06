<script setup lang="ts">
import UpperCard from '../components/UpperCard.vue'

const appStore = useAppStore()

defineOptions({ name: 'UpperList' })
const { width, height, style } = useAppMainSize(16, 64)

function createUpper() {
  appStore.openCommonDialog('upperDetail', { width: 350, height: 430 })
}
</script>

<template>
  <div>
    <view-tools title="PERFORMER LIST" :wrap-style="style">
      <a-button @click="createUpper">新建</a-button>
    </view-tools>

    <div :style="style">
      <card-list-wrap
        :container-height="height"
        :container-width="width"
        :item-min-width="115"
        :column-gap="20"
        :row-gap="25"
        :pic-rate="3 / 4"
        :context-height="35"
        :item="[]"
      >
        <template #default="{ items }">
          <UpperCard v-for="i in items" :upper="i" :key="i"></UpperCard>
        </template>
      </card-list-wrap>
    </div>
  </div>
</template>
