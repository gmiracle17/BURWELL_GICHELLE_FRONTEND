<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { computed, ref } from 'vue'
import TaskCard from './TaskCard.vue'

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
// Each task: { id, name, done, dueDate }
// const tasks = ref([...])
const tasks = ref([
  { id: 1, name: 'Setup Lab Environment',  done: false, dueDate: '2026-06-16', priority: 'Low'    },
  { id: 2, name: 'Complete Task List',     done: true,  dueDate: '2026-06-16', priority: 'High'   },
  { id: 3, name: 'Complete Task Card',     done: false, dueDate: '2026-06-16', priority: 'Medium' }
])

// Filter
const filter = ref('All')
const filterOptions = ['All', 'Pending', 'Done']

const filteredTasks = computed(() => {
  if (filter.value === 'Pending') return tasks.value.filter(t => !t.done)
  if (filter.value === 'Done')    return tasks.value.filter(t =>  t.done)
  return tasks.value
})

const doneCount    = computed(() => tasks.value.filter(t =>  t.done).length)
const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

let nextId = 4
const newTaskName = ref('')
const newTaskDate = ref('')
const newTaskPriority = ref('Low')

function addTask() {
  if (!newTaskName.value.trim()) return
  tasks.value.push({
    id: nextId++,
    name: newTaskName.value.trim(),
    done: false,
    dueDate: newTaskDate.value || '-',
    priority: newTaskPriority.value
  })
  newTaskName.value = ''
  newTaskDate.value = ''
  newTaskPriority.value = 'Low'
}
// TODO 2: Write handleComplete(id) — toggle the done state of the task with this id
function handleComplete(id) {
  // your code here
  // Find the task by id
  const task = tasks.value.find(t => t.id === id);
  
  // Toggle the done status if the task exists
  if (task) task.done = !task.done
}

// TODO 3: Write handleDelete(id) — remove the task with this id from the array
function handleDelete(id) {
  // your code here
  // Remove the task with the matching id from the tasks array
  tasks.value = tasks.value.filter(task => task.id !== id);
}

// Edit name based on id
function handleEdit(id) {
  // Find the task by id
  const task = tasks.value.find(t => t.id === id)

  // Toggle the done status if the task exists
  if (task) task.isEditing = !task.isEditing
}

function handleUpdate(id, newName) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.name = newName
}

function handlePriorityUpdate(id, newPriority) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.priority = newPriority
}

function clearAllDone() {
  // Remove all tasks that are marked as done
  tasks.value = tasks.value.filter(task => !task.done)
}

</script>

<template>
  <div class="app">
    <h1>My Tasks</h1>

    <div class="input-row">
      <input
        v-model="newTaskName"
        @keyup.enter="addTask"
        placeholder="New task name..."
      />
      <input
        v-model="newTaskDate"
        type="date"
        class="date-input"
      />
      <select v-model="newTaskPriority" class="priority-select">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button @click="addTask" class="btn-add">Add</button>
    </div>

    <div class="filter-buttons">
      <button :class="{ active: filter === 'All' }" @click="filter = 'All'">All ({{ doneCount + pendingCount }})</button>
      <button :class="{ active: filter === 'Done' }" @click="filter = 'Done'">Done ({{ doneCount }})</button>
      <button :class="{ active: filter === 'Pending' }" @click="filter = 'Pending'">Pending ({{ pendingCount }})</button>
      
      <button class="clear-done" @click="clearAllDone" :disabled="doneCount === 0">
        <font-awesome-icon icon="fa-trash" />
        Clear Done
      </button>
    </div>

    <!-- TODO 4: Render a <TaskCard> for each task using v-for
         - Pass :task="task" as a prop
         - Listen @complete="handleComplete"
         - Listen @delete="handleDelete"
         - Fill the "meta" named slot with the due date
    -->
    <div v-if="filteredTasks.length === 0" class="empty">
      No tasks!
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
        <template #meta>Due: {{ task.dueDate }}</template>
      </TaskCard>
    </ul>
  </div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
}
</style>