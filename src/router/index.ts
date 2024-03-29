import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import video from './modules/video'

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
          component: () => import('@/pages/home/index.vue'),
          meta: { type: 'home' }
        },
        {
          path: '/transmission',
          name: 'Transmission',
          component: () => import('@/pages/transmission/index.vue'),
          meta: { type: 'transmission' }
        },
        ...video
      ]
    }
  ]
})

export default router
