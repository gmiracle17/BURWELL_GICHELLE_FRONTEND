<script setup>
import { computed, ref } from 'vue'
import { useFetch } from '@/composables/useFetch'
import '../tasks.css'

const searchQuery = ref('')
const { data: users, loading, error, retry } = useFetch('https://jsonplaceholder.typicode.com/users')

// Apply search filter
const filteredUsers = computed(() => {
  if (!users.value) return []
  if (!searchQuery.value.trim()) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.username.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.company.name.toLowerCase().includes(query)
  )
})

function handleRetry() {
  retry()
}
</script>

<template>
  <div class="app">
    <h1><font-awesome-icon icon="fa-solid fa-users" /> Users Directory</h1>
    <div class="input-row">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔎︎ Search users by name, username, email, or company..."
        class="search-input-main"
      />
      <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search-btn">
        Clear
      </button>
    </div>

    <p class="subtitle">Loaded from JSONPlaceholder API</p>

    <div v-if="loading" class="loading">
      <font-awesome-icon icon="fa-solid fa-spinner" spin />
      Loading users...
    </div>

    <div v-else-if="error" class="error-box">
      <p>Failed to load users: {{ error }}</p>
      <button class="retry-btn" @click="handleRetry">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
        Retry
      </button>
    </div>

    <div v-else-if="filteredUsers.length === 0" class="empty">
      <p v-if="searchQuery">No users match your search "{{ searchQuery }}"</p>
      <p v-else>No users available.</p>
    </div>

    <div v-else class="user-list">
      <div v-for="user in filteredUsers" :key="user.id" class="user-card">
        <div class="user-header">
          <div class="user-avatar">
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
          <div class="user-info">
            <h3 class="user-name">{{ user.name }}</h3>
            <p class="user-username">@{{ user.username }}</p>
          </div>
        </div>

        <div class="user-details">
          <div class="detail-item">
            <span class="detail-label">Email:</span>
            <a :href="`mailto:${user.email}`" class="detail-value">{{ user.email }}</a>
          </div>

          <div class="detail-item">
            <span class="detail-label">Phone:</span>
            <span class="detail-value">{{ user.phone }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Website:</span>
            <a :href="`https://${user.website}`" target="_blank" rel="noopener" class="detail-value">
              {{ user.website }}
            </a>
          </div>

          <div class="detail-item">
            <span class="detail-label">Company:</span>
            <span class="detail-value">{{ user.company.name }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">City:</span>
            <span class="detail-value">{{ user.address.city }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Street:</span>
            <span class="detail-value">{{ user.address.street }}</span>
          </div>
        </div>
      </div>
    </div>
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

.subtitle {
  color: #9ca3af;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
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

.empty {
  text-align: center;
  padding: 2rem;
  color: var(--color-text);
  opacity: 0.7;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  transition: border-color 0.2s ease;
}

.user-card:hover {
  border-color: var(--color-green);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-green), #35a372);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.user-username {
  margin: 0.25rem 0 0 0;
  font-size: 0.8rem;
  color: var(--color-green);
  font-weight: 600;
}

.user-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  font-size: 0.85rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.7;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  color: var(--color-text);
  line-height: 1.4;
  word-break: break-word;
}

a.detail-value {
  text-decoration: none;
  transition: color 0.2s ease;
}

a.detail-value:hover {
  color: var(--color-green);
}

@media (max-width: 768px) {
  .input-row {
    flex-direction: column;
  }

  .clear-search-btn {
    width: 100%;
  }

  .user-details {
    grid-template-columns: 1fr;
  }
}
</style>