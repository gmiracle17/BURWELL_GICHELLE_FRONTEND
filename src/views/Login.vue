<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
const { login } = userStore

const nameInput = ref('')
const error = ref('')

function handleLogin() {
  if (!nameInput.value.trim()) {
    error.value = 'Please enter your name.'
    return
  }
  error.value = ''
  login(nameInput.value.trim())
  router.push('/')        
}
</script>

<template>
  <section class="login-container">
    <div class="login-card">

      <p class="login-eyebrow">Welcome to My Frontend Portfolio</p>
      <h1 class="login-title">
        Sign in to
        <span class="text-green">Build With Miracle</span>
      </h1>
      <p class="login-description">
        Enter your name to log in
      </p>

      <div class="input-group">
        <label for="name-input">Your name</label>
        <input
          id="name-input"
          v-model="nameInput"
          type="text"
          placeholder="e.g. Gichelle Miracle"
          @keyup.enter="handleLogin"
        />
        <p v-if="error" class="error-text">{{ error }}</p>
      </div>

      <button class="login-button" @click="handleLogin">
        Continue →
      </button>

    </div>
  </section>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  margin-top: 2rem;
}

.login-card {
  width: min(560px, 100%);
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 2.5rem;
}

.login-eyebrow {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-green);
  margin-bottom: 0.75rem;
  opacity: 0.9;
}

.login-title {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-text);
  margin-bottom: 1rem;
  text-align: left;
}

.login-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.8;
}

.input-group input {
  padding: 0.65rem 0.9rem;
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--color-green);
}

.error-text {
  font-size: 0.82rem;
  color: var(--color-red);
  margin: 0;
}

.login-button {
  width: 100%;
  padding: 0.7rem 1.4rem;
  background: var(--color-green);
  color: var(--color-background);
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.login-button:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.75rem 1.25rem;
  }
}
</style>