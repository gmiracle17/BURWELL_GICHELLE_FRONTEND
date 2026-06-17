<!--
=============================================================
  DAY 3 ASSIGNMENT — TaskDetailView.vue
  Displays full details for a single task
=============================================================
-->
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//import { useTaskStore } from '@/stores/taskStore'

// TODO 1: Get the current route and router instances
// const route  = useRoute()
const router = useRouter()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// const taskStore = useTaskStore()

// TODO 2: Find the task matching the route param
// Remember: route.params.id is a STRING — cast to Number before comparing
// const task = computed(() => taskStore.tasks.find(t => t.id === Number(???)))

// TODO 3: Write goBack() using router.push() to navigate to '/home'
function goBack() {
    router.push({name: 'home'})
  // your code here
}

const tasks = ref([
  { id: 1, name: 'Setup Lab Environment',  done: false, dueDate: '2026-06-16', priority: 'Low'    },
  { id: 2, name: 'Complete Task List',     done: true,  dueDate: '2026-06-16', priority: 'High'   },
  { id: 3, name: 'Complete Task Card',     done: false, dueDate: '2026-06-16', priority: 'Medium' }
])

</script>

<template>
  <div class="detail-view">

    <!-- TODO 4: Show this only if task is found (v-if="task") -->
    <!-- <div v-if="task"> -->
      <button class="back-btn" @click="goBack">← Back</button>

      <!-- TODO 5: Display task.name, task.dueDate, and task.done status -->
      <h1>{{ tasks[$route.params.id-1].name }}<!-- task name here --></h1>
      <p>Priority: {{tasks[$route.params.id-1].priority}}<!-- task done status here --></p>
      <p>Due: {{tasks[$route.params.id-1].dueDate}}<!-- task dueDate here --></p>
    <!-- </div> -->

    <!-- This case is handled by the router guard, but good to have a fallback -->
    <div v-if="false">
      <p>Task not found.</p>
      <button @click="goBack">Go Back</button>
    </div>
  </div>
</template>

<style scoped>
    .detail-view { max-width: 520px; margin: 40px auto; padding: 24px; font-family: Arial, sans-serif; }
    .back-btn { background: none; border: 1px solid #ddd; border-radius: 6px; padding: 6px 14px; cursor: pointer; margin-bottom: 20px; }
    .back-btn:hover { background: #f3f4f6; }
    h1 { color: white; font-size: 24px; margin-bottom: 12px; }
    p { color: white; font-size: 15px; margin: 6px 0; }
</style>
