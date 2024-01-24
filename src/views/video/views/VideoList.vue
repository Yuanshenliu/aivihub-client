<script setup lang="ts"></script>

<template>
  <div>
    <div class="wrap">
      <div v-for="i in 100">{{ i }}</div>
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
