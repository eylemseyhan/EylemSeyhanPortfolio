<template>
  <div class="orb-bubbles pointer-events-none select-none">
    <div
      v-for="orb in orbs"
      :key="orb.id"
      class="orb"
      :class="orb.anim"
      :style="orbStyle(orb)"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const orbs = ref([
  {
    id: 1,
    x: "5%",
    y: "30%",
    size: 140,
    color: "rgba(167,139,250,0.7)",
    blur: 24,
    anim: "orb-move-1",
    duration: 9,
  },
  {
    id: 2,
    x: "10%",
    y: "70%",
    size: 100,
    color: "rgba(6,182,212,0.6)",
    blur: 20,
    anim: "orb-move-2",
    duration: 11,
  },
  {
    id: 3,
    x: "90%",
    y: "20%",
    size: 120,
    color: "rgba(103,232,249,0.65)",
    blur: 24,
    anim: "orb-move-3",
    duration: 8,
  },
  {
    id: 4,
    x: "85%",
    y: "65%",
    size: 80,
    color: "rgba(236,72,153,0.55)",
    blur: 18,
    anim: "orb-move-4",
    duration: 10,
  },
  {
    id: 5,
    x: "50%",
    y: "10%",
    size: 90,
    color: "rgba(255,255,255,0.3)",
    blur: 20,
    anim: "orb-move-5",
    duration: 12,
  },
]);

const orbStyle = (orb) => ({
  left: orb.x,
  top: orb.y,
  width: orb.size + "px",
  height: orb.size + "px",
  background: `radial-gradient(circle at 60% 40%, ${orb.color} 0%, transparent 80%)`,
  filter: `blur(${orb.blur}px) drop-shadow(0 0 32px ${orb.color})`,
  mixBlendMode: "screen",
  position: "absolute",
  zIndex: 0,
  animationDuration: (orb.duration || 8) + "s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  animationDirection: "alternate",
});
</script>

<style scoped>
/* Component-specific styles only */
/* Ortak stiller artık shared dosyalarda */
</style>
