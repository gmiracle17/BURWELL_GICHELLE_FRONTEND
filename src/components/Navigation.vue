<script setup>
import VueLogo from '@/assets/logo.svg'
import LinkedinLogo from '@/components/icons/linkedin.webp'
import GithubLogo from '@/components/icons/github.png'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const { currentUser, isLoggedIn } = storeToRefs(userStore)
const { logout } = userStore

// Dropdown for User Name and Sign Out
const userDropdownOpen = ref(false)

// Return Home
function returnHome() {
  router.push({ name: 'home' })
}

function goToLoginPage() {
  router.push({ name: 'login' })
}

function toggleUserDropdown() {
  userDropdownOpen.value = !userDropdownOpen.value
}

function handleLogout() {
  logout()
  userDropdownOpen.value = false
}

function handleClickOutside(e) {
  const menu = document.querySelector('.user-menu')
  if (menu && !menu.contains(e.target)) {
    userDropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <nav class="navbar">
    <div class="navbar-inner">

      <div class="website-title" @click="returnHome">
        <img class="logo" :src="VueLogo" alt="Vue logo" />
        <span class="title-text">BUILD WITH MIRACLE</span>
        <span class="text-green">/ VUE.JS</span>
      </div>

      <div class="social-buttons">
        <button class="resume-button">View Resume</button>
        <a href="https://www.linkedin.com/in/gmiracle0717/" target="_blank" rel="noopener">
          <img class="social-logo" :src="LinkedinLogo" alt="LinkedIn logo" />
        </a>
        <a href="https://github.com/gmiracle17" target="_blank" rel="noopener">
          <img class="social-logo" :src="GithubLogo" alt="GitHub logo" />
        </a>

        <div class="user-menu">
          <button v-if="isLoggedIn" class="user-icon-button" @click.stop="toggleUserDropdown" :aria-expanded="userDropdownOpen">
            <font-awesome-icon icon="fa-solid fa-user" />
          </button>

          <button v-else class="nav-login-button" @click="goToLoginPage">Sign In</button>

          <div v-if="userDropdownOpen && isLoggedIn" class="user-dropdown">
            <p class="dropdown-greeting">Signed in as {{ currentUser }}</p>
            <button class="logout-button" @click="handleLogout">Sign out</button>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 1000;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem;
}

.navbar-inner {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.website-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  flex-shrink: 0;
}

.logo {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.title-text,
.text-green {
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.social-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.resume-button {
  background: transparent;
  border: 2px solid var(--color-green);
  color: var(--color-green);
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
  white-space: nowrap;
}

.resume-button:hover {
  background: var(--color-green);
  color: var(--color-background);
  transform: translateY(-1px);
}

.nav-login-button {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-login-button:hover {
  border-color: var(--color-green);
  color: var(--color-green);
}

.social-logo {
  width: 32px;
  height: 32px;
  display: block;
  transition: transform 0.3s ease;
}

.social-logo:hover {
  transform: scale(1.1);
}

.user-menu {
  position: relative;
}

.user-icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.2s ease, transform 0.2s ease;
}

.user-icon-button:hover {
  color: var(--color-green);
  transform: scale(1.1);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  width: 220px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 100;
}

.dropdown-greeting {
  font-size: 0.88rem;
  color: var(--color-text);
  margin: 0;
}

.logout-button {
  width: 100%;
  padding: 0.55rem;
  background: transparent;
  color: var(--color-red);
  border: 1px solid var(--color-red);
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease;
}

.logout-button:hover {
  background: var(--color-red);
  color: white;
}

@media (max-width: 768px) {
  .navbar {
    height: auto;
    padding: 0.75rem 1rem;
  }

  .navbar-inner {
    flex-direction: column;
    gap: 0.75rem;
  }

  .website-title {
    justify-content: center;
  }

  .social-buttons {
    width: 100%;
    justify-content: center;
  }

  .user-dropdown {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 480px) {
  .title-text {
    display: none;
  }

  .resume-button {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }
}
</style>