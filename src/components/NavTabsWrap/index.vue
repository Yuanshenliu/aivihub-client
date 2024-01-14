<script setup lang="ts">
defineOptions({ name: 'NavTabsWrap' })
const show = ref<boolean>(false)

onMounted(() => (show.value = true))

onDeactivated(() => (show.value = false))

onActivated(() => (show.value = true))
</script>

<template>
  <div v-if="show">
    <teleport to="#header-wrapper">
      <slot></slot>
    </teleport>
  </div>
</template>
