<template>
  <main class="min-h-screen py-12 px-4 sm:px-6 lg:px-8  relative overflow-x-hidden">
    <div v-if="loading" class="text-center text-cyan-300 animate-pulse mt-32 text-xl font-mono">
      <p>Proje yükleniyor...</p>
    </div>
    <div v-else-if="error" class="text-center text-pink-400 mt-32 text-lg font-mono">
      <p>Proje yüklenirken bir hata oluştu: {{ error }}</p>
    </div>
    <article
      v-else-if="project"
      class="max-w-4xl mx-auto rounded-3xl shadow-2xl border border-cyan-400/20 p-8 backdrop-blur-md neon-fade-in"
    >
      <!-- Header -->
      <header class="mb-10 text-center">
        <div class="flex justify-center mb-6">
          <img
            v-if="project.coverImageUrl"
            :src="project.coverImageUrl"
            :alt="project.title"
            class="mx-auto rounded-2xl shadow-xl max-h-72 object-contain bg-gray-800 border-2 border-cyan-400/30 neon-img"
          />
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold gradient-text-glow mb-4 tracking-tight font-sans">
          {{ project.title }}
        </h1>
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="tech-chip-neon"
          >
            {{ tech }}
          </span>
        </div>
        <div class="flex justify-center gap-4">
          <a
            v-if="project.projectUrl"
            :href="project.projectUrl"
            target="_blank"
            class="neon-btn"
          >
            <span>Canlı Demo</span>
          </a>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            class="neon-btn"
          >
            <span>GitHub</span>
          </a>
        </div>
      </header>

      <!-- Description -->
      <section class="prose prose-invert prose-lg max-w-none mb-12 text-cyan-100 font-light neon-fade-in delay-100">
        <p>{{ project.description }}</p>
      </section>

      <!-- Image Gallery -->
      <section>
        <h2 class="text-2xl font-bold text-center mb-6 gradient-text-glow">Ekran Görüntüleri</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(image, index) in project.images"
            :key="index"
            class="rounded-xl overflow-hidden border-2 border-cyan-400/30 neon-img transition-transform duration-300 hover:scale-105 hover:shadow-cyan-400/40 hover:shadow-2xl"
          >
            <img :src="image.url" :alt="image.caption || project.title" class="w-full h-auto object-cover" />
            <p v-if="image.caption" class="p-2 text-sm text-center text-cyan-300 font-mono">{{ image.caption }}</p>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProject } from '@/composables/useProject'

const route = useRoute()
const projectId = route.params.id
const { project, loading, error, loadProject } = useProject(projectId)

onMounted(loadProject)
</script>

<style scoped>
/* Neon Gradient Text + Glow */
.gradient-text-glow {
  background: linear-gradient(90deg, #67e8f9, #a78bfa 60%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 16px #a5f3fc88, 0 0 32px #a78bfa55;
  letter-spacing: 0.02em;
}

/* Neon Chip */
.tech-chip-neon {
  @apply px-3 py-1 rounded-full text-xs font-semibold font-mono;
  background: linear-gradient(135deg, #23244d 0%, #2d1e3a 100%);
  color: #a5f3fc;
  border: 1.5px solid #a5f3fc88;
  box-shadow: 0 0 8px 2px #a5f3fc55, 0 0 16px 4px #a78bfa33;
  transition: transform 0.2s, box-shadow 0.2s, color 0.2s;
}
.tech-chip-neon:hover {
  transform: scale(1.08) skewX(-6deg);
  box-shadow: 0 0 16px 4px #a5f3fc99, 0 0 32px 8px #a78bfa66;
  color: #fff;
  background: linear-gradient(90deg, #a5f3fc33 0%, #a78bfa33 100%);
}

/* Neon Button */
.neon-btn {
  @apply px-5 py-2 rounded-lg font-bold text-white bg-transparent border-2 border-cyan-400/60 transition-all duration-200;
  box-shadow: 0 0 12px #67e8f955, 0 0 32px #a78bfa33;
  background: linear-gradient(90deg, #23244d 60%, #22d3ee33 100%);
  position: relative;
  overflow: hidden;
}
.neon-btn:hover {
  background: linear-gradient(90deg, #22d3ee 0%, #a78bfa 100%);
  color: #18122B;
  box-shadow: 0 0 32px #a5f3fc99, 0 0 64px #a78bfa66;
  border-color: #a5f3fc;
  transform: scale(1.06);
}

/* Neon Image Border + Glow */
.neon-img {
  box-shadow: 0 0 24px 2px #67e8f955, 0 0 48px 8px #a78bfa33;
  border-radius: 1.25rem;
  border: 2px solid #a5f3fc33;
  transition: box-shadow 0.3s, border-color 0.3s;
}
.neon-img:hover {
  box-shadow: 0 0 48px 8px #a5f3fc99, 0 0 96px 16px #a78bfa66;
  border-color: #a5f3fc;
}

/* Fade-in Animasyonları */
@keyframes neonFadeIn {
  0% { opacity: 0; transform: translateY(40px) scale(0.98);}
  100% { opacity: 1; transform: translateY(0) scale(1);}
}
.neon-fade-in {
  animation: neonFadeIn 0.9s cubic-bezier(.77,0,.18,1) both;
}
.neon-fade-in.delay-100 {
  animation-delay: 0.1s;
}
</style> 