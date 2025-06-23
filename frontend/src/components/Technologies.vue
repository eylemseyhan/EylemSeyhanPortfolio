<template>
  <section
    id="technologies"
    class="w-full max-w-5xl mx-auto mt-8 py-8 px-4"
    aria-labelledby="tech-title"
  >
    <!-- Title -->
    <h2
      id="tech-title"
      class="text-4xl sm:text-5xl font-extrabold text-center mb-8 font-sans tracking-wide text-white drop-shadow-[0_0_16px_#a78bfa] neon-glow cursor-hover transition-all duration-700 ease-out hover:scale-110 hover:skew-x-3 hover:translate-y-[-8px] hover:drop-shadow-[0_0_32px_#a78bfa] hover:tracking-wider"
    >
      Kullandığım Teknolojiler
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Frontend Block -->
      <div class="flex flex-col items-center bg-gradient-to-br from-[#23244d]/70 to-[#2d1e3a]/80 rounded-3xl shadow-2xl p-6 backdrop-blur-md border border-white/10">
        <h3 class="text-2xl font-bold mb-6 text-white drop-shadow-[0_0_12px_#a78bfa] cursor-hover transition-all duration-600 ease-out hover:scale-105 hover:skew-x-2 hover:translate-y-[-4px] hover:drop-shadow-[0_0_20px_#06b6d4]">Frontend</h3>
        <ul class="flex flex-wrap justify-center gap-4 w-full">
          <li
            v-for="tech in frontendTech"
            :key="tech.name"
            class="group relative w-28 h-32 bg-white/5 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_8px_#67e8f9cc] hover:border-purple-400/60 hover:bg-cyan-400/10 motion-safe:animate-fadeIn"
          >
            <component
              :is="tech.icon"
              :class="['w-12 h-12 mb-2 drop-shadow-[0_0_12px_#a78bfa]', tech.color, 'transition-all duration-300 group-hover:drop-shadow-[0_0_24px_#67e8f9]']"
              aria-hidden="true"
            />
            <span class="text-white text-center text-sm font-semibold font-sans tracking-wide group-hover:text-cyan-200 transition-colors duration-300">{{ tech.name }}</span>
          </li>
        </ul>
      </div>

      <!-- Backend Block -->
      <div class="flex flex-col items-center bg-gradient-to-br from-[#23244d]/70 to-[#2d1e3a]/80 rounded-3xl shadow-2xl p-6 backdrop-blur-md border border-white/10">
        <h3 class="text-2xl font-bold mb-6 text-white drop-shadow-[0_0_12px_#a78bfa] cursor-hover transition-all duration-600 ease-out hover:scale-105 hover:skew-x-2 hover:translate-y-[-4px] hover:drop-shadow-[0_0_20px_#a78bfa]">Backend</h3>
        <ul class="flex flex-wrap justify-center gap-4 w-full">
          <li
            v-for="tech in backendTech"
            :key="tech.name"
            class="group relative w-28 h-32 bg-white/5 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_8px_#a78bfa99] hover:border-purple-400/60 hover:bg-purple-400/10 motion-safe:animate-fadeIn"
          >
            <component
              :is="tech.icon"
              :class="['w-12 h-12 mb-2 drop-shadow-[0_0_12px_#a78bfa]', tech.color, 'transition-all duration-300 group-hover:drop-shadow-[0_0_24px_#a78bfa]']"
              aria-hidden="true"
            />
            <span class="text-white text-center text-sm font-semibold font-sans tracking-wide group-hover:text-purple-200 transition-colors duration-300">{{ tech.name }}</span>
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
  { name: 'Vue.js', icon: CodeBracketIcon, color: 'text-cyan-300' },
  { name: 'Tailwind CSS', icon: PaintBrushIcon, color: 'text-sky-400' }
]
// Kullanılan backend teknolojileri
const backendTech = [
  { name: 'Node.js', icon: ServerStackIcon, color: 'text-lime-400' },
  { name: 'Lua', icon: CpuChipIcon, color: 'text-yellow-400' },
  { name: 'xUnit', icon: BeakerIcon, color: 'text-pink-400' },
  { name: 'C#', icon: CodeBracketIcon, color: 'text-blue-400' },
  { name: '.NET', icon: GlobeAltIcon, color: 'text-purple-400' }
]
</script>

<style>
/* Neon glow for title */
.neon-glow {
  text-shadow:
    0 0 8px #a78bfa,
    0 0 16px #a78bfa99,
    0 0 32px #67e8f966;
}

/* Modern sinematik hover efektleri */
.cursor-hover {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.cursor-hover:hover {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 16px #a78bfa);
  }
  50% {
    filter: drop-shadow(0 0 24px #a78bfa) drop-shadow(0 0 32px #a78bfa);
  }
}

/* Fade-in animation (optional, motion-safe) */
@media (prefers-reduced-motion: no-preference) {
  .animate-fadeIn {
    animation: fadeIn 1.1s cubic-bezier(.4,0,.2,1) both;
  }
  @keyframes fadeIn {
    0% { opacity: 0; transform: scale(0.95);}
    100% { opacity: 1; transform: scale(1);}
  }
}
</style>
