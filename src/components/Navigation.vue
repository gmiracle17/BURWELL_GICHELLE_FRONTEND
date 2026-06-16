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
    <div class="website-title" @click="returnHome" style="cursor: pointer;">
      <img class="logo" :src="VueLogo" alt="Vue logo" />
      <span class="title-text">BUILD WITH MIRACLE</span>
      <span class="text-green">/ VUE.JS</span>
    </div>

    <div class="social-buttons">
      <button class="resume-button">View Resume</button>
      <a href="https://www.linkedin.com/in/gmiracle0717/" target="_blank" rel="noopener">
        <img class="social-logo":src="LinkedinLogo" alt="LinkedIn logo"/>
      </a>
      <a href="https://github.com/gmiracle17" target="_blank" rel="noopener">
        <img class="social-logo":src="GithubLogo" alt="GitHub logo"/>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 15px;
  left: 15rem;
  right: 15rem;
  height: 80px;
  z-index: 1000;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.website-title {
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.logo {
  width: 48px;
  height: 48px;
}

.title-text, .text-green {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.social-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.resume-button {
  background: transparent;
  border: 2px solid var(--color-green);
  color: var(--color-green);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease;
  font-size: 1rem;
}

.resume-button:hover {
  background: var(--color-green);
  color: var(--color-background);
  opacity: 0.9;
  transform: translateY(-1px);
}

.social-logo {
  width: 48px;
  height: 48px;
  display: block;
  transition: 0.3s ease;
}

.social-logo:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .social-buttons {
    width: 100%;
    justify-content: center;
  }

  .website-title {
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>