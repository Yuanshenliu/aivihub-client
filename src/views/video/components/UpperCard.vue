<script setup lang="ts">
import type { CardItemBounds, UpperField } from 'types/index'

defineOptions({ name: 'UpperCard' })
defineProps<{ itemField: CardItemBounds; upper?: UpperField }>()
const emit = defineEmits<{
  click: [id?: string]
}>()
</script>

<template>
  <div :style="{ ...itemField.value }" class="cursor-pointer" @click="emit('click', upper?.id)">
    <div class="card-item-poster" :class="{ 'loading-wrap': !upper?.id }"></div>

    <div class="flex h-[35px] w-full items-center text-center text-[15px]">
      <span class="w-full truncate px-1 text-center" v-if="upper?.id">
        {{ upper?.name }}
      </span>

      <div class="loading-wrap h-[16px] w-full" v-else></div>
    </div>
  </div>
</template>
