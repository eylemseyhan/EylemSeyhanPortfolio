<template>
  <main class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div v-if="loading" class="text-center">
      <p>Proje yükleniyor...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-400">
      <p>Proje yüklenirken bir hata oluştu: {{ error }}</p>
    </div>
    <article v-else-if="project" class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-8 text-center">
        <img v-if="project.coverImageUrl" :src="project.coverImageUrl" :alt="project.title" class="mx-auto mb-6 rounded-2xl shadow-lg max-h-72 object-contain bg-gray-800" />
        <h1 class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">{{ project.title }}</h1>
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <span v-for="tech in project.technologies" :key="tech" class="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
            {{ tech }}
          </span>
        </div>
        <div class="flex justify-center gap-4">
          <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank" class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold transition">Canlı Demo</a>
          <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold transition">GitHub</a>
        </div>
      </header>

      <!-- Description -->
      <section class="prose prose-invert prose-lg max-w-none mb-12">
        <p>{{ project.description }}</p>
      </section>

      <!-- Image Gallery -->
      <section>
        <h2 class="text-2xl font-bold text-center mb-6">Ekran Görüntüleri</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(image, index) in project.images" :key="index" class="rounded-lg overflow-hidden border border-gray-700">
            <img :src="image.url" :alt="image.caption || project.title" class="w-full h-auto object-cover">
            <p v-if="image.caption" class="p-2 text-sm text-center bg-dark-lighter/30 text-gray-400">{{ image.caption }}</p>
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
.prose {
  /* Tailwind Prose a özelleştirmeler */
  --tw-prose-body: theme('colors.white');
  --tw-prose-headings: theme('colors.white');
}
</style> 