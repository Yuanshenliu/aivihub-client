<script setup lang="ts">
const { width, height, style } = useAppMainSize(16, 64)
</script>

<template>
  <div>
    <div :style="style">
      <EmptyType1></EmptyType1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 40px;
  -moz-column-count: 3; /* Firefox */
  -webkit-column-count: 3; /* Safari and Chrome */
  column-count: 3;
}
</style>
