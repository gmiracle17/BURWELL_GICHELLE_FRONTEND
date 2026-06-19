<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import '../tasks.css'
import TaskCard from './TaskCard.vue'

const taskStore = useTaskStore()
const router = useRouter()
const { tasks } = storeToRefs(taskStore)
const { addTask, editTask, toggleTask, removeTask, setPriority } = taskStore

const filter = ref('All')
const searchQuery = ref('')

// Apply search filter
const searchedTasks = computed(() => {
  if (!searchQuery.value.trim()) return tasks.value
  
  const query = searchQuery.value.toLowerCase()
  return tasks.value.filter(task =>
    task.name.toLowerCase().includes(query)
  )
})

// Apply status filter
const filteredTasks = computed(() => {
  if (filter.value === 'Pending') return searchedTasks.value.filter(task => !task.done)
  if (filter.value === 'Done') return searchedTasks.value.filter(task => task.done)
  return searchedTasks.value
})

const totalCount = computed(() => searchedTasks.value.length)
const doneCount = computed(() => searchedTasks.value.filter(task => task.done).length)
const pendingCount = computed(() => searchedTasks.value.filter(task => !task.done).length)

const newTaskName = ref('')
const newTaskDate = ref('')
const newTaskPriority = ref('Low')

function handleAddTask() {
  if (!newTaskName.value.trim()) return

  addTask(newTaskName.value.trim(), newTaskDate.value || null)

  if (newTaskPriority.value !== 'Low' && tasks.value.length > 0) {
    const latestTask = tasks.value[tasks.value.length - 1]
    setPriority(latestTask.id, newTaskPriority.value)
  }

  newTaskName.value = ''
  newTaskDate.value = ''
  newTaskPriority.value = 'Low'
}

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
    <h1>My Tasks : Pinia Version</h1>

    <div class="input-row">
      <input v-model="newTaskName" @keyup.enter="handleAddTask" placeholder="Enter new task name..." />
      <input v-model="newTaskDate" type="date" class="date-input" />
      <select v-model="newTaskPriority" class="priority-select">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button @click="handleAddTask">Add Task</button>
    </div>

    <div class="input-row">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔎︎ Search tasks by title..."
        class="search-input-main"
      />
      <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search-btn">
        Clear
      </button>
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
      <p v-if="searchQuery">No tasks match your search "{{ searchQuery }}"</p>
      <p v-else-if="filter === 'All'">No tasks yet. Add one above!</p>
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
.search-input-main {
  flex: 1;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
  transition: border-color 0.2s ease;
}

.search-input-main:focus {
  outline: none;
  border-color: var(--color-green);
}

.clear-search-btn {
  padding: 0.4rem 0.9rem;
  background: var(--color-green);
  color: var(--color-background);
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-search-btn:hover {
  transform: translateY(-1px);
}

.input-row input[type="date"] {
  flex: 0 1 150px;
  max-width: 150px;
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