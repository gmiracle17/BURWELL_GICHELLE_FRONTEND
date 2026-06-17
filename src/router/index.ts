import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '@/components/Introduction.vue'
import TaskCounter from '@/views/task1/TaskCounter.vue'
import TaskListView from '@/views/task2/TaskListView.vue'
import HomeView from '@/views/task3/HomeView.vue'
import TaskDetailView from '@/views/task3/TaskDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Introduction,},
    { path: '/task-counter', name: 'task-counter', component: TaskCounter,},
    { path: '/task-list', name: 'task-list', component: TaskListView,},
    { path: '/task-home', name: 'task-home', component: HomeView,},
    { path: '/task/:id', component: TaskDetailView, meta: { requiresTask: true }}
  ],
})

export default router