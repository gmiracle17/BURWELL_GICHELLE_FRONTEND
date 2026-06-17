import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '@/components/Introduction.vue'
import TaskCounter from '@/views/TaskCounter.vue'
import TaskListView from '@/views/TaskListView.vue'
import TaskCard from '@/views/TaskCard.vue'
import TaskDetails from '@/views/TaskDetailView.vue'

// Pinia
// import { useTaskStore } from '@/stores/taskStore'
const routes = [
  { path: '/', name: 'home', component: Introduction,},
  { path: '/task-counter', name: 'task-counter', component: TaskCounter,},
  { path: '/task-list', name: 'task-list', component: TaskListView,},
  { path: '/task-card', name: 'task-card', component: TaskCard,},
  { path: '/task-details/:id', name: 'task-details', component: TaskDetails},
  // TODO 6: Add the /about route
  // { path: '/about', component: AboutView },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// TODO 8: Add a beforeEach navigation guard
// - Check if to.meta.requiresTask is true
// - If so, get the task store and check if a task with to.params.id exists
// - If NOT found: next({ path: '/home', query: { error: 'notfound' } })
// - If found (or not a protected route): next()
/*
router.beforeEach((to, from, next) => {
  // your guard logic here
  next() // don't remove this — it must always be called
})*/

export default router