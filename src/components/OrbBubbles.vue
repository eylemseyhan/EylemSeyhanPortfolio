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
  opacity: 0.9;
  transition: filter 0.3s, transform 0.3s, box-shadow 0.3s;
  will-change: transform, filter, box-shadow;
}
.orb:hover {
  filter: blur(48px) drop-shadow(0 0 48px rgba(255, 255, 255, 0.18));
  transform: scale(1.15);
  box-shadow: 0 0 64px 16px rgba(167, 139, 250, 0.18),
    0 0 32px 8px rgba(103, 232, 249, 0.12);
  z-index: 2;
}

/* Orb Animasyonları */
@keyframes orb-move-1 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-30px, -60px) scale(1.15);
    opacity: 0.95;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
}
@keyframes orb-move-2 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(40px, 20px) rotate(5deg) scale(1.12);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
@keyframes orb-move-3 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translate(-20px, -50px) rotate(-6deg) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.7;
  }
}
@keyframes orb-move-4 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(15px, 30px) rotate(3deg) scale(1.08);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
@keyframes orb-move-5 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-25px, 25px) scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }
}

/* Animation class bindings */
.orb-move-1 {
  animation-name: orb-move-1;
}
.orb-move-2 {
  animation-name: orb-move-2;
}
.orb-move-3 {
  animation-name: orb-move-3;
}
.orb-move-4 {
  animation-name: orb-move-4;
}
.orb-move-5 {
  animation-name: orb-move-5;
}
</style>
