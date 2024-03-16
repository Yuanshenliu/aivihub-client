<script setup lang="ts">
import type { Collection } from 'types/index'
import { getCollectionPageList } from '@/apis/video'

defineOptions({ name: 'CollectionList' })

const props = defineProps<{
  loading: boolean
  upperId: string
  itemWrapHeight: number
  width: number
}>()

const loadCollections = ref<boolean>()
const currentPage = ref(1)
const totalSize = ref(0)
const collectionList = ref<Collection[]>([])
const totalPages = ref(0)

async function getCollectionList(pageIndex: number) {
  loadCollections.value = true
  const { records, total, pages } = await getCollectionPageList({
    pageIndex,
    upper: props.upperId
  })
  totalSize.value = total
  collectionList.value = records
  totalPages.value = pages
  loadCollections.value = false
}

getCollectionList(currentPage.value)

function reload() {
  currentPage.value = 1
  getCollectionList(currentPage.value)
}

defineExpose({
  reload
})
</script>

<template>
  <card-list-wrap
    :loading="loading && loadCollections"
    :container-height="itemWrapHeight"
    :container-width="width"
    :item-min-width="255"
    :column-gap="20"
    :row-gap="25"
    :pic-rate="16 / 9"
    :context-height="35"
    :items="collectionList"
    :wrap-style="{ paddingTop: '20px' }"
    :show-footer="totalPages > 1"
  >
    <template #default="{ items }">
      <VideoItemCard v-for="i in items" :key="i" :entry="i" type="collection"></VideoItemCard>
    </template>

    <template #footer>
      <a-pagination
        v-model:current="currentPage"
        :defaultPageSize="50"
        :total="totalSize"
        show-less-items
      ></a-pagination>
    </template>

    <template #empty>
      <EmptyType1></EmptyType1>
    </template>
  </card-list-wrap>
</template>

<style scoped lang="scss"></style>
