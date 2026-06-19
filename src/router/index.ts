import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '@/components/Introduction.vue'
import Login from '@/views/Login.vue'
import TasksHome from '@/views/week1-tasks/TasksHome.vue'
import StatsView from '@/views/week1-tasks/StatsView.vue'
import TaskDetailView from '@/views/week1-tasks/TaskDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Introduction,},
    { path: '/login', name: 'login', component: Login,},
    { path: '/task-home', name: 'task-home', component: TasksHome,},
    { path: '/task/:id', component: TaskDetailView, meta: { requiresTask: true }},
    { path: '/task-stats', name: 'task-stats', component: StatsView},
  ],
})

export default router