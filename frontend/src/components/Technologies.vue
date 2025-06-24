<template>
  <section id="technologies" class="technologies-container" aria-labelledby="tech-title">
    <h2 id="tech-title" class="technologies-title cursor-hover">Kullandığım Teknolojiler</h2>
    <div class="technologies-grid">
      <!-- Frontend Block -->
      <div class="tech-block frontend-block">
        <h3 class="tech-block-title cursor-hover">Frontend</h3>
        <ul class="tech-list">
          <li v-for="tech in frontendTech" :key="tech.name" class="tech-card group">
            <component
              :is="tech.icon"
              :class="['tech-icon', tech.color]"
              aria-hidden="true"
            />
            <span class="tech-name">{{ tech.name }}</span>
          </li>
        </ul>
      </div>
      <!-- Backend Block -->
      <div class="tech-block backend-block">
        <h3 class="tech-block-title cursor-hover">Backend</h3>
        <ul class="tech-list">
          <li v-for="tech in backendTech" :key="tech.name" class="tech-card group">
            <component
              :is="tech.icon"
              :class="['tech-icon', tech.color]"
              aria-hidden="true"
            />
            <span class="tech-name">{{ tech.name }}</span>
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

<style scoped>
.technologies-container {
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.technologies-title {
  font-size: 2.25rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Lexend', Arial, sans-serif;
  letter-spacing: 0.04em;
  color: #f7d4fa;
  text-shadow:
    0 2px 8px #c026d3,
    0 8px 24px #a78bfa,
    0 1px 0 #fff,
    0 0px 2px #fff;
  transition: all 0.7s cubic-bezier(.4,0,.2,1);
  transition: all 0.7s cubic-bezier(.4,0,.2,1);
}
@media (min-width: 640px) {
  .technologies-title { font-size: 3rem; }
}
@media (min-width: 1024px) {
  .technologies-title { font-size: 3.75rem; }
}
.technologies-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  .technologies-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.tech-block {
  background: linear-gradient(135deg, #23244dB3 0%, #2d1e3acc 100%);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 #a78bfa33;
  padding: 2rem 1.5rem;
  border: 1.5px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tech-block-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
  text-shadow: 0 0 12px #a78bfa;
  transition: all 0.6s cubic-bezier(.4,0,.2,1);
}
.tech-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}
.tech-card {
  width: 7rem;
  height: 8rem;
  background: rgba(255,255,255,0.05);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 16px 0 #a78bfa22;
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
  cursor: pointer;
}
.tech-card:hover {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 0 32px 8px #67e8f9cc;
  border-color: #a78bfa;
  background: rgba(103,232,249,0.08);
}
.tech-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 12px #a78bfa);
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}
.group:hover .tech-icon {
  filter: drop-shadow(0 0 24px #67e8f9);
  transform: scale(1.12);
}
.tech-name {
  color: #fff;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Lexend', Arial, sans-serif;
  letter-spacing: 0.03em;
  transition: color 0.3s cubic-bezier(.4,0,.2,1);
}
.group:hover .tech-name {
  color: #67e8f9;
}
/* Modern sinematik hover efektleri */
.cursor-hover {
  transform-style: preserve-3d;
  perspective: 1000px;
}
.cursor-hover:hover {
  animation: glow-pulse 2s ease-in-out infinite;
  scale: 1.08;
  skew: 2deg;
  letter-spacing: 0.04em;
}
@keyframes glow-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 16px #a78bfa);
  }
  50% {
    filter: drop-shadow(0 0 24px #a78bfa) drop-shadow(0 0 32px #a78bfa);
  }
}
</style>
