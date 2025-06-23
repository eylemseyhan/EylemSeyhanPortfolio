<template>
  <div>
    <div
      ref="cursor"
      class="custom-cursor pointer-events-none fixed top-0 left-0 z-50"
      :style="cursorStyle"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import gsap from 'gsap'

const cursor = ref(null)
const size = ref(36)
const baseSize = 36
const hoverSize = 60
const color = '#d946ef'
const baseGlow = '0 0 24px 8px #d946ef99, 0 0 64px 16px #d946ef44'
const hoverGlow = '0 0 32px 16px #d946efcc, 0 0 96px 32px #d946ef88'
const isHovering = ref(false)

const cursorStyle = computed(() => ({
  width: size.value + 'px',
  height: size.value + 'px',
  background: 'rgba(217, 70, 239, 0.18)',
  boxShadow: isHovering.value ? hoverGlow : baseGlow,
  border: '2px solid #d946ef',
  filter: 'blur(0.5px)',
  transition: 'background 0.2s, box-shadow 0.2s',
}))

let moveHandler, enterHandler, leaveHandler

onMounted(() => {
  moveHandler = (e) => {
    gsap.to(cursor.value, {
      x: e.clientX - size.value / 2,
      y: e.clientY - size.value / 2,
      duration: 0.22,
      ease: 'power3.out',
    })
  }
  window.addEventListener('mousemove', moveHandler)

  enterHandler = () => {
    isHovering.value = true
    gsap.to(size, { value: hoverSize, duration: 0.22, ease: 'power3.out' })
  }
  leaveHandler = () => {
    isHovering.value = false
    gsap.to(size, { value: baseSize, duration: 0.22, ease: 'power3.out' })
  }
  document.querySelectorAll('a, button, .cursor-hover').forEach(el => {
    el.addEventListener('mouseenter', enterHandler)
    el.addEventListener('mouseleave', leaveHandler)
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', moveHandler)
  document.querySelectorAll('a, button, .cursor-hover').forEach(el => {
    el.removeEventListener('mouseenter', enterHandler)
    el.removeEventListener('mouseleave', leaveHandler)
  })
})
</script>

<style scoped>
.custom-cursor {
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
  mix-blend-mode: lighten;
  /* Neon efekti için arka planı hafif saydam ve blur ile yumuşaklaştır */
  backdrop-filter: blur(2.5px);
  /* Animasyonlar için hızlı geçişler */
  transition: background 0.2s, box-shadow 0.2s;
}
</style>
