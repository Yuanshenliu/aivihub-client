import { defineStore } from 'pinia'
import type { CommonDialogField } from 'types/index'
import { base64toBlob } from '@/utils'
import type { TaskPackFiled } from '../../electron/upload/taskPack'

type CommonDialog = 'imageCropper' | 'upperDetail' | 'collection' | 'submission'
type AppSetting = {
  upperOrder: string[]
}

export const useAppStore = defineStore('appStore', () => {
  const token = ref<string>('')
  const searching = ref<boolean>(false)
  const commonDialog = useStorage<CommonDialogField>('common-dialog', {})
  const cropperChannel = new BroadcastChannel('cropper-dialog')
  const executedUploadTasks = ref<TaskPackFiled[]>([])
  const appSettings = useLocalStorage<AppSetting>('app-settings', {
    upperOrder: ['1']
  })

  const showNavTab = computed(() => {
    return !searching.value
  })

  window.electron.on<TaskPackFiled[]>('uploading-task', (queue) => {
    executedUploadTasks.value = queue
  })

  async function openCommonDialog<T>(
    name: CommonDialog,
    bounds: { width: number; height: number },
    params: Record<string, any> = {}
  ): Promise<T> {
    commonDialog.value.name = name
    commonDialog.value.params = params
    return await window.electron.invoke('open-dialog', { ...bounds, name })
  }

  function selectSingleImage() {
    return new Promise((resolve, reject): string | void => {
      try {
        window.electron.invoke<BlobPart[]>('select-image', {}).then((res) => {
          const reader = new FileReader()
          reader.readAsDataURL(new Blob(res))

          reader.onload = (e) => {
            resolve(e.target?.result as string)
          }
        })
      } catch (e) {
        reject()
      }
    })
  }

  function openImageCropDialog(aspectRatio: number): Promise<{ url: string; blob: Blob }> {
    return new Promise((resolve, reject) => {
      selectSingleImage()
        .then((url) => {
          openCommonDialog<{ result?: string }>(
            'imageCropper',
            { width: 380, height: 460 },
            { resourceImageUrl: url, aspectRatio: aspectRatio }
          ).then(({ result }) => {
            if (!result) {
              reject()
            } else {
              resolve({
                url: result,
                blob: base64toBlob(result)
              })
            }
          })
        })
        .catch(() => reject())
    })
  }

  return {
    token,
    searching,
    showNavTab,
    openCommonDialog,
    selectSingleImage,
    cropperChannel,
    appSettings,
    openImageCropDialog,
    executedUploadTasks
  }
})
