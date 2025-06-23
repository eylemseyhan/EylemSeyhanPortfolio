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
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import gsap from 'gsap'
  
  const cursor = ref(null)
  const size = ref(24)
  const baseSize = 24
  const hoverSize = 48
  
  const isHovering = ref(false)
  
  const cursorStyle = computed(() => ({
    width: size.value + 'px',
    height: size.value + 'px',
    borderRadius: '50%',
    background: isHovering.value
      ? 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 100%)'
      : 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%)',
    boxShadow: isHovering.value
      ? '0 0 32px 8px rgba(168, 85, 247, 0.4), 0 0 64px 16px rgba(6, 182, 212, 0.3), inset 0 0 16px 2px rgba(168, 85, 247, 0.2)'
      : '0 0 20px 6px rgba(168, 85, 247, 0.3), 0 0 40px 12px rgba(6, 182, 212, 0.2), inset 0 0 12px 1px rgba(168, 85, 247, 0.1)',
    backdropFilter: 'blur(2px)',
    mixBlendMode: 'lighten',
    transition: 'box-shadow 0.3s ease, background 0.3s ease',
  }))
  
  let moveHandler, enterHandler, leaveHandler
  
  onMounted(() => {
    moveHandler = (e) => {
      gsap.to(cursor.value, {
        x: e.clientX - size.value / 2,
        y: e.clientY - size.value / 2,
        duration: 0.15,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', moveHandler)
  
    enterHandler = () => {
      isHovering.value = true
      gsap.to(size, { value: hoverSize, duration: 0.3, ease: 'power2.out' })
    }
  
    leaveHandler = () => {
      isHovering.value = false
      gsap.to(size, { value: baseSize, duration: 0.3, ease: 'power2.out' })
    }
  
    // hover olunca büyüsün diye link ve butonlara ekle
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
    position: fixed;
    top: 0;
    left: 0;
    will-change: transform;
    pointer-events: none;
    z-index: 9999;
  }
  </style>
  