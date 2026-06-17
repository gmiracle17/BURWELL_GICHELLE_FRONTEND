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

// TODO 1: Read route.query.error — if it equals 'notfound', show a warning banner
const showErrorBanner = computed(() => route.query.error === 'notfound')
</script>

<template>
  <!-- Changed home-view to app for general formatting in tasks.css-->
  <div class="app">
    <h1>📝 My Tasks</h1>

    <!-- TODO 2: Show a warning banner if showErrorBanner is true -->
    <div class="error-banner" v-if="showErrorBanner">
      ⚠️ Task not found. Redirected back to home.
    </div>

    <nav class="page-nav">
      <!-- TODO 3: Add a RouterLink to /about -->
      <!-- Changed to portfolio homepage -->
      <RouterLink to="/">About Miracle</RouterLink>
    </nav>

    <!-- TODO 4: Render each task as a RouterLink to /task/:id -->
    <!-- Use <RouterLink :to="`/task/${task.id}`"> as the wrapper -->
    <ul class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id">
        <!-- TODO 5: Wrap this in a RouterLink -->
        <RouterLink :to="`/task/${task.id}`">
            <span :class="{ done: task.done }">{{ task.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
