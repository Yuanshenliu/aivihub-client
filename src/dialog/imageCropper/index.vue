<script setup lang="ts">
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const appStore = useAppStore()

let cropper: Cropper

const params = inject<{ resourceImageUrl: string; aspectRatio: number }>('common-dialog-params')

onMounted(async function () {
  await nextTick()
  const elm = document?.getElementById('image') as HTMLImageElement

  if (elm) {
    cropper = new Cropper(elm, {
      dragMode: 'move',
      aspectRatio: params?.aspectRatio,
      minContainerWidth: 348,
      minContainerHeight: 310
    })
  }
})

function addImage() {
  appStore.selectSingleImage().then((path) => {
    cropper.replace(path as string)
  })
}

function confirm(closeFn: Function) {
  const url = cropper.getCroppedCanvas().toDataURL()
  closeFn({ result: url })
}
</script>

<template>
  <v-dialog title="图片裁剪">
    <div class="flex h-fit w-full">
      <div class="h-[280px] w-[100%]">
        <img id="image" :src="params?.resourceImageUrl" alt="" />
      </div>
    </div>

    <template #footer="{ close }">
      <div class="flex w-full items-center justify-between">
        <div>
          <a-button ghost type="primary" class="mr-3" @click="addImage">添加图片</a-button>
        </div>
        <div>
          <a-button ghost type="primary" class="mr-3" @click="close">取消</a-button>
          <a-button type="primary" @click="confirm(close)">确定</a-button>
        </div>
      </div>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">
img {
  max-width: 100%;
}
</style>
