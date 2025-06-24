<template>
  <div class="orb-bubbles pointer-events-none select-none">
    <div v-for="orb in orbs" :key="orb.id"
      class="orb"
      :class="orb.anim"
      :style="orbStyle(orb)"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const orbs = ref([
  // Sol
  { id: 1, x: '5%', y: '30%', size: 180, color: 'rgba(167,139,250,0.35)', blur: 32, anim: 'orb-move-1', duration: 18 },
  { id: 2, x: '10%', y: '70%', size: 120, color: 'rgba(6,182,212,0.28)', blur: 24, anim: 'orb-move-2', duration: 22 },
  // Sağ
  { id: 3, x: '90%', y: '20%', size: 140, color: 'rgba(103,232,249,0.32)', blur: 28, anim: 'orb-move-3', duration: 20 },
  { id: 4, x: '85%', y: '65%', size: 100, color: 'rgba(236,72,153,0.22)', blur: 20, anim: 'orb-move-4', duration: 16 },
])

const orbStyle = (orb) => ({
  left: orb.x,
  top: orb.y,
  width: orb.size + 'px',
  height: orb.size + 'px',
  background: `radial-gradient(circle at 60% 40%, ${orb.color} 0%, transparent 80%)`,
  filter: `blur(${orb.blur}px) drop-shadow(0 0 32px ${orb.color})`,
  position: 'absolute',
  zIndex: 0,
  animationDuration: (orb.duration || 16) + 's',
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
  animationDirection: 'alternate'
})
</script>

<style>
.orb-bubbles {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
.orb {
  border-radius: 50%;
  opacity: 0.85;
  transition: filter 0.3s, transform 0.3s, box-shadow 0.3s;
  will-change: transform, filter, box-shadow;
}
.orb:hover {
  filter: blur(48px) drop-shadow(0 0 48px rgba(255,255,255,0.18));
  transform: scale(1.12);
  box-shadow: 0 0 64px 16px rgba(167,139,250,0.18), 0 0 32px 8px rgba(103,232,249,0.12);
  z-index: 2;
}
.orb-move-1 { animation-name: orb-move-1; }
.orb-move-2 { animation-name: orb-move-2; }
.orb-move-3 { animation-name: orb-move-3; }
.orb-move-4 { animation-name: orb-move-4; }
@keyframes orb-move-1 {
  0%   { transform: translate(0, 0) scale(1); }
  30%  { transform: translate(20px, -30px) scale(1.08); }
  60%  { transform: translate(-10px, -50px) scale(1.04);}
  100% { transform: translate(0, 0) scale(1); }
}
@keyframes orb-move-2 {
  0%   { transform: translate(0, 0) scale(1); }
  40%  { transform: translate(-18px, 22px) scale(0.97);}
  80%  { transform: translate(12px, 18px) scale(1.03);}
  100% { transform: translate(0, 0) scale(1); }
}
@keyframes orb-move-3 {
  0%   { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(-15px, 18px) scale(1.1);}
  75%  { transform: translate(20px, -18px) scale(0.95);}
  100% { transform: translate(0, 0) scale(1); }
}
@keyframes orb-move-4 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(10px, 20px) scale(0.92);}
  100% { transform: translate(0, 0) scale(1); }
}
</style> 