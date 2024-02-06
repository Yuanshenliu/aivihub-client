<script setup lang="ts">
import qr from '@/assets/images/qr.png'
</script>

<template>
  <div class="flex h-full w-full flex-col items-center">
    <span class="line-10 h-10 text-base leading-10 text-regular">扫描二维码登录</span>

    <div class="mt-1 flex h-full w-full flex-1 flex-col items-center border-r border-gray-200">
      <div class="h-fit w-fit rounded border border-gray-200 p-1">
        <img width="166" height="166" :src="qr" alt="" />
      </div>

      <span class="px-12 text-center text-xs text-secondary"
        >请使用
        <a type="primary" class="text-primary">哗哩哗哩客户端</a>
        扫码登录或扫码下载APP</span
      >
    </div>
  </div>
</template>

<style scoped></style>
