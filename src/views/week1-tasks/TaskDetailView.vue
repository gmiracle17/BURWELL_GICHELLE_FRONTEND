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
const task = computed(() => taskStore.tasks.find(task => task.id === Number(route.params.id)))

// TODO 3: Write goBack() to return to the previous page
function goBack() {
  router.back()
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
      <button class="back-btn error-back" @click="goBack">← Go Back Home</button>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: column;
}

.meta-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.6rem;
  font-size: 0.85rem;
}

.meta-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.empty-state {
  text-align: center;
  padding: 1.5rem 0;
}

.error-back {
  border-color: var(--color-red);
  color: var(--color-red);
  align-self: center;
  margin-top: 0.8rem;
  font-size: 0.85rem;
}

.error-back:hover {
  background: var(--color-red);
  border-color: var(--color-red);
  color: white;
}
</style>