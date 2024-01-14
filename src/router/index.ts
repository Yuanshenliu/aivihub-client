import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      name: 'Layout',
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/home/index.vue'),
          meta: { type: 'home' }
        },
        {
          path: '/',
          name: 'Video',
          component: () => import('@/views/video/index.vue'),
          meta: { type: 'video' }
        }
      ]
    }
  ]
})

export default router
