<script setup>
import { useRouter } from 'vue-router' 
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const router = useRouter()

// storeToRefs to pull pre-calculated global counts safely
const { totalCount, doneCount, pendingCount } = storeToRefs(taskStore)

function goBack() {
  router.push({ name: 'task-home-pinia' })
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
  gap: 0.75rem;
  margin-top: 1rem;
}

.stat-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem 0.8rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: border-color 0.2s ease;
}

.stat-card:hover {
  border-color: var(--color-green);
}

.stat-number {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
}

/* Color accents based on card states */
.stat-card.total .stat-number { color: var(--color-text); }
.stat-card.doneCount .stat-number { color: var(--color-green); }
.stat-card.pending .stat-number { color: #FFC107; }

.stat-label {
  color: #8b97a5;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
}
</style>