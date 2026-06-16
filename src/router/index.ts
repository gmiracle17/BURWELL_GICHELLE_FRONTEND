import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '@/components/Introduction.vue'
import TaskCounter from '@/views/TaskCounter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Introduction,
    },
    {
      path: '/task-counter',
      name: 'task-counter',
      component: TaskCounter,
    },
  ],
})

export default router