<script setup lang="ts">
import DeveloperImage from '../assets/developer-photo.jpg'
import { useRouter } from 'vue-router'

const router = useRouter()

function viewProjects(){
  router.push({ name: 'task-counter' })
}
</script>

<template>
  <section class="introduction">
    <div class="intro-text">
      <h1 class="intro-title">
        Build with Miracle:
        <span class="green-text">
          Web Projects in Vue.js
        </span>
      </h1>

      <p class="intro-description">
        Hi! I'm Gichelle Miracle 奇跡 Burwell, an Application and Web Developer Intern at IBM.<br/><br/>
        Explore my collection of Vue.js projects that showcase my skills in
        front-end development, problem-solving, and user-focused design.
      </p>

      <!--temporary button-->
      <button class="view-button" @click="viewProjects">
        View Projects
      </button>
    </div>

    <div class="intro-image">
      <img
        :src="DeveloperImage"
        alt="Developer photo"
      />
    </div>
  </section>
</template>

<style scoped>
.introduction {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  padding: 4rem 2rem;
}

.intro-text {
  flex: 1;
  max-width: 650px;
}

.intro-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  text-align: left;
}

.green-text {
  color: var(--color-green);
}

.intro-description {
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-text);

  opacity: 0.85;

  margin-bottom: 2rem;
}

.view-button {
  background: var(--color-green);
  color: var(--color-background);
  border: none;
  border-radius: 10px;
  padding: 0.9rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease;
}

.view-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.intro-image {
  flex: 1;
  display: flex;
  justify-content: right;
}

.intro-image img {
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  object-fit: cover;
}

@media (max-width: 900px) {
  .introduction {
    flex-direction: column-reverse;
    text-align: center;

    padding: 2rem 1rem;
  }

  .intro-title {
    font-size: 2.5rem;
  }

  .intro-image img {
    max-width: 300px;
  }
}
</style>