<template>
  <section
    class="w-full min-h-[60vh] flex flex-col justify-center items-center text-center px-4 pt-24"
  >
    <h1
      class="eylem text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-thin"
    >
      {{ displayedText }}
      <span v-if="showCursor" class="cursor">|</span>
    </h1>
    <p class="text-lg font-light">
      Trakya Üniversitesi Bilgisayar Mühendisliği mezunuyum.
    </p>
    <p class="text-lg font-light">
      React, Vue, .NET ve Firebase gibi teknolojilerle fullstack web
      uygulamaları geliştiriyorum.
    </p>
    <slot name="buttons" />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const fullText = "Hoş geldin, ben Eylem.";
const displayedText = ref("");
const showCursor = ref(true);
let currentIndex = 0;

onMounted(() => {
  const typingInterval = setInterval(() => {
    if (currentIndex < fullText.length) {
      displayedText.value += fullText[currentIndex];
      currentIndex++;
    } else {
      clearInterval(typingInterval);
      showCursor.value = false; // Yazı tamamlandığında cursor durdurulsun
    }
  }, 100);
});
</script>

<style scoped>
.eylem,
.eylem * {
  box-sizing: border-box;
}
.eylem {
  color: #f7d4fa;
  text-align: center;
  font-family: "Lexend", Arial, sans-serif;
  line-height: 84.39%;
  font-weight: 100;
  position: relative;
  text-shadow: 0 2px 8px #c026d3, 0 8px 24px #a78bfa, 0 1px 0 #fff,
    0 0px 2px #fff;
}

.cursor {
  display: inline-block;
  width: 1px;
  background-color: #f7d4fa;
  animation: blink 1s infinite;
  margin-left: 4px;
}

.cursor.stopped {
  animation: none;
  opacity: 1; /* Sabit görünmesini sağla */
}

@keyframes blink {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}

/* Responsive font sizes */
@media (min-width: 1024px) {
  .eylem {
    font-size: 170px;
  }
}
@media (max-width: 1023px) {
  .eylem {
    font-size: clamp(48px, 8vw, 120px);
  }
}
</style>
