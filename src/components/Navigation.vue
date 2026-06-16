<script setup>
import VueLogo from '@/assets/logo.svg'
import LinkedinLogo from '@/components/icons/linkedin.webp'
import GithubLogo from '@/components/icons/github.png'
import { useRouter } from 'vue-router'

const router = useRouter()

function returnHome(){
  router.push({ name: 'home' })
}
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
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Navbar spans full width but centers its content */
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

/* Inner wrapper constrains max width and handles layout */
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

.social-logo {
  width: 32px;
  height: 32px;
  display: block;
  transition: transform 0.3s ease;
}

.social-logo:hover {
  transform: scale(1.1);
}

/* Tablet */
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
}

/* Mobile */
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