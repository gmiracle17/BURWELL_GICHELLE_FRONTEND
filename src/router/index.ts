import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '@/components/Introduction.vue'
import TaskCounter from '@/views/TaskCounter.vue'
import TaskListView from '@/views/TaskListView_Template_Task2.vue'
import TaskCard from '@/views/TaskCard_Template_Task2.vue'

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
    {
      path: '/task-list',
      name: 'task-list',
      component: TaskListView,
    },
    {
      path: '/task-card',
      name: 'task-card',
      component: TaskCard,
    }
  ],
})

export default router