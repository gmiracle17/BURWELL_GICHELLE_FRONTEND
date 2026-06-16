<!--
=============================================================
  DAY 1 ASSIGNMENT — Reactive Task Counter App
  Topic: Vue 3 Composition API (ref, computed, v-model, v-for)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reactive task management app that demonstrates Vue 3's
reactivity system. You will use ref(), computed(), v-model, v-for,
and event handling — the core building blocks of every Vue app.

WHAT TO BUILD
-------------
A single-file Vue component (this file) that:

  1. Has a text input + "Add Task" button to create new tasks.
  2. Displays the task list, each item with:
       - A checkbox to mark it as done
       - The task name (strike-through when done)
       - A "Remove" button
  3. Shows a live stats bar:
       Total Tasks | Done: X | Pending: X
  4. Shows an empty state message when there are no tasks.

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] Use ref() for the text input value
  [x] Use ref() for the tasks array
  [x] Use computed() for total, done, and pending counts
  [x] Use v-model on the text input
  [x] Use v-for with :key to render the task list
  [x] Use @keyup.enter on the input to also trigger addTask
  [x] Prevent adding empty/whitespace-only tasks
  [x] Clear the input after adding a task

EXTENSION (if you finish early)
---------------------------------
  - Add a filter bar: All | Done | Pending — filters the visible list
  - Add a "Clear All Done" button that removes all completed tasks
  - Add a task priority: Low / Medium / High (use a <select> dropdown)

HINTS (read only if stuck)
---------------------------
  Hint 1: import { ref, computed } from 'vue'
  Hint 2: tasks.value.push({ id: Date.now(), name: '...', done: false })
  Hint 3: computed(() => tasks.value.filter(t => t.done).length)
  Hint 4: For :class strikethrough — :class="{ done: task.done }"
  Hint 5: v-model on a checkbox binds to a boolean — v-model="task.done"
  Hint 6: To prevent empty tasks — if (!newTaskName.value.trim()) return

FILE STRUCTURE (this is a single-file component)
-------------------------------------------------
  <script setup>  — all your reactive logic goes here
  <template>      — your HTML markup
  <style scoped>  — your CSS (scoped = only applies to this component)
=============================================================
-->

<script setup>
import { ref, computed } from 'vue'
import './TaskCounter.css'

// TODO 1: Create a ref for the text input value (initial value: '')
const newTaskName = ref('')

// TODO 2: Create a ref for the tasks array (initial value: [])
const tasks = ref([])

// TODO 3: Create computed() values for total, done, and pending counts
const totalCount = computed(() => tasks.value.length)
const doneCount = computed(() => tasks.value.filter(task => task.done).length)
const pendingCount = computed(() => tasks.value.filter(task => !task.done).length)

// Created ref and computed for task priority filter extension
const selectedPriority = ref('Low')

// Created filter state and computed for filtered tasks to implement the filter buttons
const selectedFilter = ref('all'); // 'all', 'done', or 'pending'
const filteredTasks = computed(() => {

  // Show 'done' tasks
  if (selectedFilter.value === 'done') {
    return tasks.value.filter(task => task.done);

  // Show 'pending' tasks
  } else if (selectedFilter.value === 'pending') {
    return tasks.value.filter(task => !task.done);
  }

  // Show all tasks by default
  return tasks.value;
});

// TODO 4: Write the addTask() function
// - Prevent empty tasks
// - Push a new task object to tasks.value: { id, name, done }
// - Clear the input
function addTask() {
  // Prevent adding empty/whitespace-only tasks
  if (!newTaskName.value.trim()) return; 
  
  // Create a new task object and add it to the tasks array
  tasks.value.push({
    id: Date.now(), 
    name: newTaskName.value.trim(), 
    done: false,
    priority: selectedPriority.value
  });

  newTaskName.value = '';
}

// TODO 5: Write toggleTask(id) — flip task.done for the matching task
function toggleTask(id) {
  
  // Find the task by id
  const task = tasks.value.find(t => t.id === id);
  
  // Toggle the done status if the task exists
  if (task) {
    task.done = !task.done;
  }
  
}

// TODO 6: Write removeTask(id) — filter out the task with this id
function removeTask(id) {
  // Remove the task with the matching id from the tasks array
  tasks.value = tasks.value.filter(task => task.id !== id);
}

// Clear All Done Button Handler
function clearAllDone() {
  // Remove all tasks that are marked as done
  tasks.value = tasks.value.filter(task => !task.done)
}

</script>

<template>
  <div class="app">
    <h1>Task Counter</h1>

    <!-- TODO 7: Add an input with v-model, @keyup.enter, and placeholder -->
    <!-- TODO 8: Add an "Add Task" button with @click="addTask" -->
    <div class="input-row">
      
      <!-- Input for new task name with v-model and @keyup.enter to trigger addTask -->
      <input v-model="newTaskName" @keyup.enter="addTask" placeholder="Enter a new task"/>
      
      <!-- Select dropdown for task priority -->
      <select v-model="selectedPriority" class="priority-select">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <!-- Add Task button -->
      <button @click="addTask">
        Add Task
      </button>
    </div>

    <!-- TODO 9: Display the stats bar using your computed values -->
    <!-- Combined stats bar with filter buttons for better UX -->
    <div class="filter-buttons" flex>
      <button :class="{ active: selectedFilter === 'all' }" @click="selectedFilter = 'all'">All ({{ totalCount }})</button>
      <button :class="{ active: selectedFilter === 'done' }" @click="selectedFilter = 'done'">Done ({{ doneCount }})</button>
      <button :class="{ active: selectedFilter === 'pending' }" @click="selectedFilter = 'pending'">Pending ({{ pendingCount }})</button>
      
      <!-- Clear All Done button, disabled when there are no done tasks -->
      <button class="clear-done" @click="clearAllDone" :disabled="doneCount === 0">
        <font-awesome-icon icon="fa-trash" />
        Clear Done
      </button>

    </div>

    <!-- TODO 10: Show this message only when the task list is empty -->
    <!-- Created custom empty messages for each filter-->
    <p v-if="filteredTasks.length === 0 && selectedFilter === 'all'" class="empty">No tasks yet. Add one above!</p>
    <p v-if="filteredTasks.length === 0 && selectedFilter === 'done'" class="empty">No done tasks yet.</p>
    <p v-if="filteredTasks.length === 0 && selectedFilter === 'pending'" class="empty">No pending tasks yet.</p>
    
    <!-- TODO 11: Render the task list using v-for -->
    <!-- Each item needs: checkbox (v-model), task name (:class done), remove button -->
    <p v-else>
      <ul class="task-list">
        <li  v-for="task in filteredTasks" :key="task.id">
          
          <!-- Checkbox to mark task as done, bound to task.done with v-model -->
          <input type="checkbox" v-model="task.done" class="task-checkbox"/>
          
          <!-- Task name with conditional class for done status and priority label -->
          <div class="task-text" :class="{ done: task.done }">
            {{ task.name }}
            
            <!-- Priority label with dynamic class based on task.priority -->
            <span class="priority" :class="task.priority.toLowerCase()">
              {{ task.priority }}
            </span>
          
          </div>
          
          <!-- Remove button to delete the task, calls removeTask with task.id -->
          <button @click="removeTask(task.id)" class="remove-button">X</button>
        </li>
      </ul>
    </p>
  </div>
</template>