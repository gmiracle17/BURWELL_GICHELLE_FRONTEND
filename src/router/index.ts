import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '@/components/Introduction.vue'
import TaskCounter from '@/views/task1/TaskCounter.vue'
import TaskListView from '@/views/task2/TaskListView.vue'
import HomeView from '@/views/task3/HomeView.vue'
import TaskDetailView from '@/views/task3/TaskDetailView.vue'
import TaskStatsView from '@/views/task3/StatsView.vue'
import ReactiveTaskCounter from '@/views/task4/ReactiveTaskCounter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Introduction,},
    { path: '/task-1', name: 'task-counter', component: TaskCounter,},
    { path: '/task-2', name: 'task-list', component: TaskListView,},
    //{ path: '/task-home', name: 'task-home', component: HomeView,},
    { path: '/task/:id', component: TaskDetailView, meta: { requiresTask: true }},
    { path: '/task-stats', name: 'task-stats', component: TaskStatsView},
    { path: '/task-4', name:'task-home', component: ReactiveTaskCounter}
  ],
})

export default router