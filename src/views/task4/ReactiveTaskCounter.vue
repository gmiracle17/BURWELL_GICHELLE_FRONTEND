<!--
=============================================================
  DAY 4 ASSIGNMENT — TaskListView.vue (refactored for Pinia)
  Remove all local state. Use the store for everything.
=============================================================
-->
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import '../tasks.css'

// TODO 1: Import your store
import { useTaskStore } from '@/stores/taskStore'

// TODO 2: Get the store instance
const taskStore = useTaskStore()

// TODO 3: Destructure REACTIVE STATE using storeToRefs()
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore)

// TODO 4: Destructure ACTIONS directly (no storeToRefs needed for functions)
const { addTask, toggleTask, removeTask } = taskStore

// This local ref is fine — it's UI state, not task state
const newTaskName = ref('')

function handleAdd() {
  const name = newTaskName.value  
  if (!newTaskName.value.trim()) return; 
  addTask(name)
  newTaskName.value=''
}

</script>

<template>
  <div class="task-view">
    <h1>📝 Tasks</h1>

    <!-- TODO 6: Display totalCount, doneCount, pendingCount from the store -->
    <div class="stats">
      Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
    </div>

    <div class="input-row">
      <input v-model="newTaskName" placeholder="New task..." @keyup.enter="handleAdd" />
      <button @click="handleAdd">Add</button>
    </div>

    <!-- TODO 7: Render the task list using tasks from the store -->
    <div v-if="totalCount !== 0">
      <ul class="task-list">
        <li v-for = "task in tasks">
          <input type="checkbox" v-model="task.done" class="task-checkbox" @click="toggleTask(task.id)"/>
          <div class="task-text" :class="{ done: task.done }">{{ task.name }}</div>
          <button @click="removeTask(task.id)" class="remove-button">X</button>
        </li>
      </ul>
    </div>
    <div v-else>No tasks!</div>
  </div>
</template>

<style scoped>
.task-view { max-width: 480px; margin: 40px auto; padding: 24px; font-family: Arial, sans-serif; }
h1 { color: white; }
.stats { font-size: 13px; color: #555; padding: 8px 12px; background: #e9f7f0; border-radius: 6px; margin-bottom: 16px; }
.input-row { display: flex; gap: 8px; margin-bottom: 16px; }
.input-row input { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
.input-row button { padding: 8px 16px; background: #42B883; color: white; border: none; border-radius: 6px; cursor: pointer; }
</style>
