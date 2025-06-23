<template>
  <main class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 200 } }"
        class="text-center mb-12"
      >
        <h1 class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Projelerim
        </h1>
        <p class="mt-4 text-lg text-gray-300">
          Geliştirdiğim ve katkıda bulunduğum projelere buradan göz atabilirsiniz.
        </p>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mb-4"></div>
        <p class="text-gray-300">Projeler yükleniyor...</p>
        <p v-if="retryCount > 0" class="text-sm text-gray-500 mt-2">
          Deneme {{ retryCount }}/3...
        </p>
      </div>
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-400 mb-4">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <p class="text-lg font-semibold">Projeler yüklenirken bir hata oluştu</p>
          <p class="text-sm text-gray-400 mt-1">{{ error.message }}</p>
        </div>
        <button 
          @click="retry" 
          class="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:brightness-110 transition-all duration-200"
        >
          Tekrar Dene
        </button>
      </div>

      <transition-group
        v-else
        tag="ul"
        name="project-list"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <li
          v-for="(project, index) in projects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
        >
          <router-link :to="{ name: 'project-detail', params: { id: project.id } }" class="project-card block">
            <div class="relative overflow-hidden rounded-lg">
              <img :src="project.coverImageUrl" :alt="project.title" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
              <div class="absolute bottom-0 left-0 p-4">
                <h2 class="text-xl font-bold text-white">{{ project.title }}</h2>
              </div>
            </div>
            <div class="p-4 bg-dark-lighter/30 rounded-b-lg">
              <p class="text-gray-400 text-sm mb-3 h-10 overflow-hidden">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                  {{ tech }}
                </span>
              </div>
            </div>
          </router-link>
        </li>
      </transition-group>
    </div>
  </main>
</template>

<script setup>
import { useProjects } from '@/composables/useProjects'

const { projects, loading, error, retry, retryCount } = useProjects()
</script>

<style scoped>
.project-card {
  @apply bg-dark-lighter/60 rounded-lg shadow-lg overflow-hidden transition-all duration-300;
  @apply hover:shadow-cyan-500/20 hover:scale-105;
}
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.5s ease;
}
.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style> 