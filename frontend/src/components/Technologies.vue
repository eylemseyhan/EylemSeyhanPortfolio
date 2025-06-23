<template>
  <section
    id="technologies"
    class="w-full max-w-5xl mx-auto mt-16 py-12 px-4rounded-2xl"
    aria-labelledby="tech-title"
  >
    <h2
      id="tech-title"
      class="text-3xl sm:text-4xl font-bold text-center text-white mb-12 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent"
    >
      Kullandığım Teknolojiler
    </h2>

    <div class="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-16">
      <!-- Frontend -->
      <div
        class="flex-1 w-full flex flex-col items-center p-6 bg-dark-lighter/30 rounded-lg"
      >
        <h3 class="text-2xl font-semibold text-primary mb-6">Frontend</h3>
        <ul class="flex flex-wrap justify-center gap-4" role="list">
          <li
            v-for="tech in frontendTech"
            :key="tech.name"
            class="group relative bg-dark-lighter/50 rounded-lg p-4 flex flex-col items-center justify-center w-32 h-32 transition-all duration-300 hover:scale-105 hover:bg-dark-lighter/90 hover:shadow-lg hover:shadow-accent/20"
          >
            <component
              :is="tech.icon"
              :class="['w-12 h-12 mb-2 transition-colors duration-300', tech.color]"
              aria-hidden="true"
            />
            <span class="text-gray-300 text-center text-sm font-medium">{{ tech.name }}</span>
            <div
              class="absolute inset-0 border-2 border-transparent group-hover:border-accent rounded-lg transition-all duration-300"
            ></div>
          </li>
        </ul>
      </div>

      <!-- Backend -->
      <div
        class="flex-1 w-full flex flex-col items-center p-6 bg-dark-lighter/30 rounded-lg"
      >
        <h3 class="text-2xl font-semibold text-primary mb-6">Backend</h3>
        <ul class="flex flex-wrap justify-center gap-4" role="list">
          <li
            v-for="tech in backendTech"
            :key="tech.name"
            class="group relative bg-dark-lighter/50 rounded-lg p-4 flex flex-col items-center justify-center w-32 h-32 transition-all duration-300 hover:scale-105 hover:bg-dark-lighter/90 hover:shadow-lg hover:shadow-accent/20"
          >
            <component
              :is="tech.icon"
              :class="['w-12 h-12 mb-2 transition-colors duration-300', tech.color]"
              aria-hidden="true"
            />
            <span class="text-gray-300 text-center text-sm font-medium">{{ tech.name }}</span>
            <div
              class="absolute inset-0 border-2 border-transparent group-hover:border-accent rounded-lg transition-all duration-300"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  CodeBracketIcon,
  PaintBrushIcon,
  ServerStackIcon,
  BeakerIcon,
  CpuChipIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/solid'

// Kullanılan frontend teknolojileri
const frontendTech = [
  { name: 'Vue.js', icon: CodeBracketIcon, color: 'text-green-400' },
  { name: 'Tailwind CSS', icon: PaintBrushIcon, color: 'text-sky-400' }
]
// Kullanılan backend teknolojileri
const backendTech = [
  { name: 'Node.js', icon: ServerStackIcon, color: 'text-lime-400' },
  { name: 'Lua', icon: CpuChipIcon, color: 'text-yellow-400' },
  { name: 'xUnit', icon: BeakerIcon, color: 'text-pink-400' },
  { name: 'C#', icon: CodeBracketIcon, color: 'text-blue-400' },
  { name: '.NET', icon: GlobeAltIcon, color: 'text-purple-500' }
]
</script>
