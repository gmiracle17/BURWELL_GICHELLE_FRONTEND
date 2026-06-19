<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function viewPiniaTasks() {
  router.push({ name: 'task-home-pinia' })
}

function viewJSONTasks() {
  router.push({ name: 'task-home-json' })
}

function viewUsers() {
  router.push({ name: 'users' })
}
</script>

<template>
  <div class="projects-page">
    <div class="projects-header">
      <h1 class="projects-title">My Projects</h1>
      <p class="projects-subtitle">
        Explore my Vue.js applications showcasing various features and best practices
      </p>
    </div>

    <div class="project-cards">
      <div class="project-card" @click="viewPiniaTasks">
        <div class="card-icon">
          <font-awesome-icon icon="fa-solid fa-list-check" />
        </div>
        <h3 class="card-title">Tasks with Pinia</h3>
        <p class="card-description">
          Full-featured task manager with state management using Pinia store.
        </p>
        <ul class="card-features">
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Add, edit, and delete tasks</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Mark tasks as complete</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Set priorities and due dates</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Filter by status</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> View detailed task information</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Statistics dashboard</li>
        </ul>
        <div class="card-action">
          <span>Explore <font-awesome-icon icon="fa-solid fa-arrow-right" /></span>
        </div>
      </div>

      <div class="project-card" @click="viewJSONTasks">
        <div class="card-icon">
          <font-awesome-icon icon="fa-solid fa-globe" />
        </div>
        <h3 class="card-title">Tasks from JSON API</h3>
        <p class="card-description">
          Read-only task viewer fetching data from JSONPlaceholder API.
        </p>
        <ul class="card-features">
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Live API data fetching</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Search functionality</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Filter by completion status</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Error handling with retry</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Loading states</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Responsive design</li>
        </ul>
        <div class="card-action">
          <span>Explore <font-awesome-icon icon="fa-solid fa-arrow-right" /></span>
        </div>
      </div>

      <div class="project-card" @click="viewUsers">
        <div class="card-icon">
          <font-awesome-icon icon="fa-solid fa-users" />
        </div>
        <h3 class="card-title">Users Directory</h3>
        <p class="card-description">
          User directory displaying contact information from external API.
        </p>
        <ul class="card-features">
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Fetch users from API</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Display user profiles</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Contact information</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Company details</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Two-column layout</li>
          <li><font-awesome-icon icon="fa-solid fa-check" class="check-icon" /> Error recovery</li>
        </ul>
        <div class="card-action">
          <span>Explore <font-awesome-icon icon="fa-solid fa-arrow-right" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  padding: 1.5rem;
  padding-top: calc(80px + 1.5rem);
  padding-bottom: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.projects-header {
  text-align: center;
  margin-bottom: 2rem;
}

.projects-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.projects-subtitle {
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.8;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.5;
}

.project-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.project-card {
  background: var(--color-background-soft);
  border: 2px solid var(--color-border);
  border-radius: 10px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  border-color: var(--color-green);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.card-icon {
  font-size: 2.25rem;
  margin-bottom: 0.75rem;
  text-align: center;
  color: var(--color-green);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  text-align: center;
}

.card-description {
  font-size: 0.85rem;
  color: var(--color-text);
  opacity: 0.8;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  text-align: center;
}

.card-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  flex: 1;
}

.card-features li {
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.9;
  padding: 0.3rem 0;
  line-height: 1.4;
}

.card-action {
  text-align: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.card-action span {
  font-weight: 700;
  color: var(--color-green);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.project-card:hover .card-action span {
  transform: translateX(4px);
  display: inline-block;
}

/* ── Tablet ── */
@media (max-width: 900px) {
  .project-cards {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .projects-page {
    padding: 4.5rem 1rem 2rem;
  }

  .projects-title {
    font-size: 1.5rem;
  }

  .projects-subtitle {
    font-size: 0.9rem;
  }

  .project-card {
    padding: 1.25rem;
  }

  .card-icon {
    font-size: 2rem;
  }

  .card-title {
    font-size: 1rem;
  }
}
</style>
