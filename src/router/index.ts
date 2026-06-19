import { createRouter, createWebHistory } from 'vue-router'

import Introduction from '@/components/Introduction.vue'
import Projects from '@/views/Projects.vue'
import Login from '@/views/Login.vue'
import TasksHomeFromPinia from '@/views/week1-tasks/TasksHomeFromPinia.vue'
import TasksHomeFromJSON from '@/views/week1-tasks/TasksHomeFromJSON.vue'
import StatsView from '@/views/week1-tasks/StatsView.vue'
import TaskDetailView from '@/views/week1-tasks/TaskDetailView.vue'
import UsersView from '@/views/week1-tasks/UsersView.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Introduction },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/login', name: 'login', component: Login },
    { path: '/task-home-pinia', name: 'task-home-pinia', component: TasksHomeFromPinia },
    { path: '/task-home-json', name: 'task-home-json', component: TasksHomeFromJSON },
    { path: '/task/:id', component: TaskDetailView, meta: { requiresTask: true } },
    { path: '/task-stats', name: 'task-stats', component: StatsView },
    { path: '/users', name: 'users', component: UsersView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
  ],
})

export default router