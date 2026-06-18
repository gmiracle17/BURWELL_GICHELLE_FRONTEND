<!--
=============================================================
  DAY 3 ASSIGNMENT — TaskDetailView.vue
  Displays full details for a single task
=============================================================
-->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'

// TODO 1: Get the current route and router instances
const route  = useRoute()
const router = useRouter()

const taskStore = useTaskStore()

// TODO 2: Find the task matching the route param
// Remember: route.params.id is a STRING — cast to Number before comparing
const task = computed(() => taskStore.tasks.find(t => t.id === Number(route.params.id)))

// TODO 3: Write goBack() using router.push() to navigate to '/task-home'
function goBack() {
  router.push('/task-home')
}
</script>

<template>
  <div class="app">

    <!-- TODO 4: Show this only if task is found (v-if="task") -->
    <div v-if="task" class="detail-container">
      <div class="back-btn-wrapper">
        <button class="back-btn" @click="goBack">← Back to Tasks</button>
      </div>

      <!-- TODO 5: Display task.name, task.dueDate, task.priority and task.done status -->
      <h1>{{ task.name }}</h1>
      
      <div class="meta-card">
        <div class="meta-row">
          <span class="meta-label">Status</span>
          <span class="status-badge" :class="task.done ? 'completed-badge' : 'pending-badge'">
            {{ task.done ? 'Done' : 'Pending' }}
          </span>
        </div>

        <!-- Added task priority row to complement Day 1/2 updates -->
        <div class="meta-row">
          <span class="meta-label">Priority</span>
          <span v-if="task.priority" class="priority" :class="task.priority.toLowerCase()">
            {{ task.priority }}
          </span>
          <span v-else class="meta-value">-</span>
        </div>

        <div class="meta-row">
          <span class="meta-label">Due Date</span>
          <span class="meta-value">{{ task.dueDate || 'No Due Date Set' }}</span>
        </div>
      </div>
    </div>

    <!-- Fallback container state when item parameters are missing -->
    <div v-else class="detail-container empty-state">
      <p class="empty">Task parameters not found or missing.</p>
      <button class="back-btn error-back" @click="goBack">Go Back Home</button>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: column;
}

.back-btn-wrapper {
  margin-bottom: 1rem;
}

.back-btn { 
  background: transparent; 
  border: 1px solid var(--color-border); 
  color: var(--color-text); 
  border-radius: 999px; 
  padding: 0.4rem 1rem; 
  font-size: 0.9rem;
  cursor: pointer; 
  transition: all 0.2s ease;
}

.back-btn:hover { 
  border-color: var(--color-green);
  color: var(--color-green);
}

.meta-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.75rem;
}

.meta-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.meta-label {
  color: #8b97a5;
  font-size: 0.9rem;
  font-weight: 500;
}

.meta-value {
  color: var(--color-text);
  font-size: 0.95rem;
  font-weight: 600;
}

/* Specific semantic custom status pill tokens */
.status-badge {
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
}
.completed-badge {
  background: rgba(65, 184, 131, 0.15);
  color: var(--color-green);
}
.pending-badge {
  background: rgba(255, 193, 7, 0.15);
  color: #FFC107;
}

/* Explicit task card style matching layout variables */
.priority {
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
  white-space: nowrap;
}
.priority.low { background: rgba(65, 184, 131, 0.15); color: var(--color-green); }
.priority.medium { background: rgba(255, 193, 7, 0.15); color: #FFC107; }
.priority.high { background: rgba(206, 36, 36, 0.15); color: var(--color-red); }

.empty-state {
  text-align: center;
  padding: 2rem 0;
}

.error-back {
  border-color: var(--color-red);
  color: var(--color-red);
  align-self: center;
  margin-top: 1rem;
}

.error-back:hover {
  background: var(--color-red);
  color: white;
}
</style>