<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { ref } from 'vue'
import TaskCard from './TaskCard_Template_Task2.vue'

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
// Each task: { id, name, done, dueDate }
// const tasks = ref([...])
const tasks = ref([
  { id: 1, name: 'Setup Lab Environment', done: false, dueDate: '2026-06-16' },
  { id: 2, name: 'Complete Task List', done: true, dueDate: '2026-06-16' },
  { id: 3, name: 'Complete Task Card', done: false, dueDate: '2026-06-16' }])

// TODO 2: Write handleComplete(id) — toggle the done state of the task with this id
function handleComplete(id) {
  // your code here
  // Find the task by id
  const task = tasks.value.find(t => t.id === id);
  
  // Toggle the done status if the task exists
  if (task) {
    task.done = !task.done;
  }
}

// TODO 3: Write handleDelete(id) — remove the task with this id from the array
function handleDelete(id) {
  // your code here
  // Remove the task with the matching id from the tasks array
  tasks.value = tasks.value.filter(task => task.id !== id);
}
</script>

<template>
  <div class="task-list-view">
    <h1>My Tasks</h1>

    <!-- TODO 4: Render a <TaskCard> for each task using v-for
         - Pass :task="task" as a prop
         - Listen @complete="handleComplete"
         - Listen @delete="handleDelete"
         - Fill the "meta" named slot with the due date
    -->
    <div v-if="tasks.length === 0" class="empty">No tasks</div>
    <div v-else>
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @complete="handleComplete"
        @delete="handleDelete"
      >
        <template #meta>
          Due: {{ task.dueDate }}
        </template>
      </TaskCard>
    </div>
    
  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 { color: white ; margin-bottom: 24px; margin-top: 24px;}
</style>
