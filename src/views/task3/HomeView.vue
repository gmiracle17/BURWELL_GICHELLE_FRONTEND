<!--
=============================================================
  DAY 3 ASSIGNMENT — HomeView.vue
  Shows the task list with router-link navigation to each task
=============================================================
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const route     = useRoute()

// Show a warning banner if redirected here after a bad task id lookup
const showErrorBanner = computed(() => route.query.error === 'notfound')

// Guard against tasks being undefined/null while the store is loading
const tasks = computed(() => taskStore.tasks ?? [])

function toggleTask(id) {
  // Find the task by id directly in the store array for proper reactivity
  const task = taskStore.tasks.find(t => t.id === id);
  
  // Toggle the done status if the task exists
  if (task) {
    task.done = !task.done;
  }
}
</script>

<template>
  <div class="app">
    <h1>My Tasks</h1>

    <div class="error-banner" v-if="showErrorBanner" role="alert">
      ⚠️ Task not found. Redirected back to home.
    </div>

    <nav class="page-nav">
      <RouterLink to="/task-stats">STATISTICS</RouterLink>
      <RouterLink to="/">ABOUT MIRACLE</RouterLink>
    </nav>

    <div v-if="tasks.length === 0" class="empty">
      No tasks!
    </div>
    <ul v-else class="task-list">
      <li v-for="task in tasks" :key="task.id">
        <!-- Static checkbox indicator for clean styling visual context -->
        <span @click="toggleTask(task.id)" class="task-checkbox" :class="{ 'is-checked': task.done }"></span>
        
        <RouterLink :to="`/task/${task.id}`" class="task-item-link">
          <span class="task-text" :class="{ done: task.done }">{{ task.name }}</span>
          <span class="view-link-arrow">→</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page-nav {
  display: flex;
  justify-content: left;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.error-banner {
  background-color: rgba(206, 36, 36, 0.1);
  color: var(--color-red);
  border: 1px solid var(--color-red);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
  text-align: center;
}

.task-item-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.view-link-arrow {
  color: #8b97a5;
  font-weight: 700;
  margin-right: 1rem;
  transition: transform 0.2s ease, color 0.2s ease;
}

.task-list li:hover .view-link-arrow {
  transform: translateX(3px);
  color: var(--color-green);
}
.task-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-green);
  border-radius: 4px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
}
.task-checkbox.is-checked {
  background: var(--color-green);
}
.task-checkbox.is-checked::after {
  content: "✓";
  color: var(--color-background);
  font-size: 13px;
  font-weight: 700;
}
</style>