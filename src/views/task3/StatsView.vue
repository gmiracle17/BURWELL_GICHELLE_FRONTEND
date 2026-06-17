

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router' 
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const router = useRouter()
const totalCount = computed(() => taskStore.tasks.length)
const doneCount = computed(() => taskStore.tasks.filter(t => t.done).length)
const pendingCount = computed(() => totalCount.value - doneCount.value)

function goBack() {
  router.push('/task-home')
}
</script>

<template>
  <div class="app stats-app">
    <div class="back-btn-wrapper">
        <button class="back-btn" @click="goBack">← Back to Tasks</button>
    </div>
    <h1>Task Stats</h1>
    <div class="stats-grid">
      <div class="stat-card total">
        <span class="stat-number">{{ totalCount }}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat-card doneCount">
        <span class="stat-number">{{ doneCount }}</span>
        <span class="stat-label">Done</span>
      </div>
      <div class="stat-card pending">
        <span class="stat-number">{{ pendingCount }}</span>
        <span class="stat-label">Pending</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-grid { 
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem; 
  margin-top: 1.5rem; 
}

.stat-card { 
  background: var(--color-background); 
  border: 1px solid var(--color-border); 
  border-radius: 10px; 
  padding: 1.25rem 1rem; 
  text-align: center; 
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: border-color 0.2s ease;
}

.stat-card:hover {
  border-color: var(--color-green);
}

.stat-number { 
  display: block; 
  font-size: 2rem; 
  font-weight: 700; 
  line-height: 1;
  text-decoration: none !important;
}

/* Color accents based on card states */
.stat-card.total .stat-number { color: var(--color-text); }
.stat-card.doneCount .stat-number { color: var(--color-green); }
.stat-card.pending .stat-number { color: #FFC107; }

.stat-label { 
  color: #8b97a5; 
  font-size: 0.85rem; 
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}


.back-btn-wrapper {
  margin-bottom: 1rem;
}

.back-btn { 
  background: transparent; 
  border: 1px solid var(--color-border); 
  color: var(--color-text); 
  border-radius: 999px; 
  padding: 0.4rem 1rem; 
  font-size: 0.9rem;
  cursor: pointer; 
  transition: all 0.2s ease;
}

.back-btn:hover { 
  border-color: var(--color-green);
  color: var(--color-green);
}
</style>