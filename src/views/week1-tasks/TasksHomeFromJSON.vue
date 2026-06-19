<script setup>
import { computed, ref } from 'vue'
import { useFetch } from '@/composables/useFetch'
import '../tasks.css'

const filter = ref('All')
const searchQuery = ref('')
const { data: todos, loading, error, retry } = useFetch('https://jsonplaceholder.typicode.com/todos')

const normalizedTodos = computed(() => {
  if (!todos.value) return []

  return todos.value.slice(0, 20).map(todo => ({
    id: todo.id,
    name: todo.title,
    done: todo.completed,
    dueDate: `User ${todo.userId}`,
    priority: todo.completed ? 'Low' : 'Medium'
  }))
})

// Apply search filter
const searchedTasks = computed(() => {
  if (!searchQuery.value.trim()) return normalizedTodos.value
  
  const query = searchQuery.value.toLowerCase()
  return normalizedTodos.value.filter(task => 
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

function handleRetry() {
  retry()
}
</script>

<template>
  <div class="app">
    <h1><font-awesome-icon icon="fa-solid fa-globe" /> My Tasks - JSON API Version</h1>

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

    <div class="api-note">
      <p> Read-only tasks loaded from JSONPlaceholder API</p>
    </div>

    <div class="filter-buttons">
      <button :class="{ active: filter === 'All' }" @click="filter = 'All'">
        All ({{ totalCount }})
      </button>
      <button :class="{ active: filter === 'Done' }" @click="filter = 'Done'">
        Done ({{ doneCount }})
      </button>
      <button :class="{ active: filter === 'Pending' }" @click="filter = 'Pending'">
        Pending ({{ pendingCount }})
      </button>
    </div>

    <div v-if="loading" class="loading">
      <font-awesome-icon icon="fa-solid fa-spinner" spin />
      Loading tasks...
    </div>

    <div v-else-if="error" class="error-box">
      <p>❌ Failed to load tasks: {{ error }}</p>
      <button class="retry-btn" @click="handleRetry">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
        Retry
      </button>
    </div>

    <div v-else-if="filteredTasks.length === 0" class="empty">
      <p v-if="searchQuery">No tasks match your search "{{ searchQuery }}"</p>
      <p v-else-if="filter === 'All'">No tasks available.</p>
      <p v-else-if="filter === 'Done'">No done tasks found.</p>
      <p v-else-if="filter === 'Pending'">No pending tasks found.</p>
    </div>

    <ul v-else class="task-list">
      <li v-for="task in filteredTasks" :key="task.id" class="task-item-readonly">
        <input type="checkbox" :checked="task.done" disabled class="task-checkbox" />
        <span class="task-text" :class="{ 'task-done': task.done }">{{ task.name }}</span>
        <span class="task-meta">{{ task.dueDate }}</span>
        <span class="task-priority" :class="task.priority.toLowerCase()">{{ task.priority }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
}

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

.api-note {
  display: block;
  margin-bottom: 1rem;
}

.api-note p {
  margin: 0;
  color: #9ca3af;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.error-box {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--color-red);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.error-box p {
  margin: 0 0 1rem 0;
  color: var(--color-text);
}

.retry-btn {
  background: var(--color-red);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.task-item-readonly {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.4rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  transition: border-color 0.2s ease;
}

.task-item-readonly:hover {
  border-color: var(--color-green);
}

.task-text {
  flex: 1;
  color: var(--color-text);
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.3;
  font-size: 0.9rem;
}

.task-done {
  text-decoration: line-through;
  opacity: 0.6;
}

.task-meta {
  font-size: 0.75rem;
  color: var(--color-text);
  opacity: 0.6;
  white-space: nowrap;
}

.task-priority {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  white-space: nowrap;
}

.task-priority.low {
  background: rgba(60, 114, 72, 0.1);
  color: var(--color-green);
}

.task-priority.medium {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}

.task-priority.high {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

@media (max-width: 768px) {
  .input-row {
    flex-direction: column;
  }

  .clear-search-btn {
    width: 100%;
  }

  .task-item-readonly {
    flex-wrap: wrap;
  }
}
</style>