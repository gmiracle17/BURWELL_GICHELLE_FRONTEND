<script setup lang="ts">
import DeveloperImage from '../assets/developer-photo.jpg'
import { useRouter } from 'vue-router'

const router = useRouter()

function viewWeek1Tasks(){
  router.push({ name: 'task-home' })
}
</script>

<template>
  <section class="introduction">
    <div class="intro-text">
      <p class="intro-eyebrow">Application & Web Developer Intern @ IBM</p>

      <h1 class="intro-title">
        Build with Miracle
        <span class="text-green">/ Vue.js</span>
      </h1>

      <p class="intro-description">
        Hi! I'm Gichelle Miracle 奇跡 Burwell. Explore my Vue.js
        projects showcasing front-end development, problem-solving, and
        user-focused design.
      </p>

      <div class="intro-actions">
        <button class="view-button" @click="viewWeek1Tasks">View Combined Task 1 to Task 4</button>
      </div>
    </div>

    <div class="intro-image">
      <img :src="DeveloperImage" alt="Gichelle Miracle Burwell" />
    </div>
  </section>
</template>

<style scoped>
.introduction {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 6rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Left column ── */
.intro-text {
  flex: 1;
  max-width: 600px;
  text-align: left;
}

.intro-eyebrow {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-green);
  margin-bottom: 1rem;
  opacity: 0.9;
}

.intro-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-text);
  margin-bottom: 1.25rem;
  text-align: left;
}

.intro-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 2rem;
  max-width: 480px;
}

.intro-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.view-button {
  background: var(--color-green);
  color: var(--color-background);
  border: 2px solid var(--color-green);
  border-radius: 8px;
  padding: 0.65rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.view-button:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

.view-button--outline {
  background: transparent;
  color: var(--color-green);
}

.view-button--outline:hover {
  background: var(--color-green);
  color: var(--color-background);
  opacity: 1;
}

/* ── Right column ── */
.intro-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.intro-image img {
  width: 500px;
  max-width: 100%;
  border-radius: 20px;
  object-fit: cover;
  object-position: top;
}

/* ── Tablet ── */
@media (max-width: 800px) {
  .introduction {
    flex-direction: column-reverse;
    padding: 5rem 1.5rem 3rem;
    gap: 2rem;
  }

  .intro-text {
    max-width: 100%;
    text-align: left;
  }

  .intro-description {
    max-width: 100%;
  }

  .intro-actions {
    justify-content: center;
  }

  .intro-image {
    justify-content: center;
  }

  .intro-image img {
    width: 300px;
  }
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .introduction {
    padding: 4.5rem 1rem 2rem;
  }

  .intro-title {
    font-size: 1.6rem;
  }

  .intro-actions {
    flex-direction: column;
  }

  .view-button {
    width: 100%;
  }
}
</style>