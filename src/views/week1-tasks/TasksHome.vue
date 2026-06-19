<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import '../tasks.css'
import TaskCard from './TaskCard.vue'

const taskStore = useTaskStore()
const router = useRouter()
const { tasks, totalCount, doneCount, pendingCount } = storeToRefs(taskStore)
const { addTask, editTask, toggleTask, removeTask, setPriority } = taskStore

const filter = ref('All')

const filteredTasks = computed(() => {
  if (filter.value === 'Pending') return tasks.value.filter(task => !task.done)
  if (filter.value === 'Done')    return tasks.value.filter(task => task.done)
  return tasks.value
})

const newTaskName = ref('')
const newTaskDate = ref('')
const newTaskPriority = ref('Low')

function handleAddTask() {
  if (!newTaskName.value.trim()) return
  
  // Call the storeAddTask and pass name and date arguments
  addTask(newTaskName.value.trim(), newTaskDate.value || null)
  
  if (newTaskPriority.value !== 'Low' && tasks.value.length > 0) {
    const latestTask = tasks.value[tasks.value.length - 1]
    setPriority(latestTask.id, newTaskPriority.value)
  }

  // Reset local input states
  newTaskName.value = ''
  newTaskDate.value = ''
  newTaskPriority.value = 'Low'
}

// Clean handlers mapping
function handleComplete(id) {
  toggleTask(id)
}

function handleDelete(id) {
  removeTask(id)
}

function handleUpdate(id, newName) {
  editTask(id, { name: newName })
}

function handlePriorityUpdate(id, newPriority) {
  setPriority(id, newPriority)
}

function clearAllDone() {
  // Filters out completed tasks
  tasks.value.forEach(task => {
    if (task.done) removeTask(task.id)
  })
}

function goToStats() {
  router.push('/task-stats')
}
</script>

<template>
  <div class="app">
    <h1>My Tasks</h1>

    <div class="input-row">
      <input v-model="newTaskName" @keyup.enter="handleAddTask" placeholder="New task name..."/>
      <input v-model="newTaskDate" type="date" class="date-input"/>
      <select v-model="newTaskPriority" class="priority-select">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button @click="handleAddTask">Add Task</button>
    </div>

    <div class="filter-buttons">
      <button class="view-stats-btn" @click="goToStats">
        <font-awesome-icon icon="fa-solid fa-chart-column" />
        Stats
      </button>
      <button :class="{ active: filter === 'All' }" @click="filter = 'All'">
        All ({{ totalCount }})
      </button>
      <button :class="{ active: filter === 'Done' }" @click="filter = 'Done'">
        Done ({{ doneCount }})
      </button>
      <button :class="{ active: filter === 'Pending' }" @click="filter = 'Pending'">
        Pending ({{ pendingCount }})
      </button> 
      
      <button class="clear-done" @click="clearAllDone" :disabled="doneCount === 0">
        <font-awesome-icon icon="fa-solid fa-trash" />
        Clear Done
      </button>
    </div>

    <div v-if="filteredTasks.length === 0" class="empty">
      <p v-if="filter === 'All'">No tasks yet. Add one above!</p>
      <p v-else-if="filter === 'Done'">No done tasks yet.</p>
      <p v-else-if="filter === 'Pending'">No pending tasks yet.</p>
    </div>

    <ul v-else class="task-list">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @complete="handleComplete"
        @delete="handleDelete"
        @update="handleUpdate"
        @update-priority="handlePriorityUpdate"
      >
        <template #meta>Due: {{ task.dueDate || 'No Due Date Set' }}</template>
      </TaskCard>
    </ul>
  </div>
</template>

<style scoped>
.input-row input[type="date"] {
  flex: 0 1 150px;
  max-width: 150px; 
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

@media (max-width: 768px) {
  .input-row input[type="date"] {
    flex: 1 1 auto;
    max-width: 100%;
  }
}

.view-stats-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 6px;
  padding: 8px 15px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  margin-right: 16px;
}

.view-stats-btn:hover {
  border-color: var(--color-green);
  color: var(--color-green);
}
</style>