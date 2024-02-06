import type { RouteRecordRaw } from 'vue-router'

const video: RouteRecordRaw[] = [
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/pages/video/index.vue'),
    meta: {}
  }
]

export default video.map((i) => {
  i.meta = { ...(i.meta || {}), type: 'video' }
  return i
})
