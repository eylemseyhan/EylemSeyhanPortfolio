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
      {{
        currentLang === "tr"
          ? "Trakya Üniversitesi Bilgisayar Mühendisliği mezunuyum."
          : "I'm a Computer Engineering graduate from Trakya University."
      }}
    </p>
    <p class="text-lg font-light">
      {{
        currentLang === "tr"
          ? "React, Vue, .NET ve Firebase gibi teknolojilerle fullstack web uygulamaları geliştiriyorum."
          : "I develop fullstack web applications with technologies like React, Vue, .NET and Firebase."
      }}
    </p>
    <slot name="buttons" />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const displayedText = ref("");
const showCursor = ref(true);
const currentLang = ref(localStorage.getItem("language") || "tr");
let currentIndex = 0;
let typingInterval = null;

const getGreeting = () => {
  return currentLang.value === "tr"
    ? "Hoş geldin, ben Eylem."
    : "Hello, I'm Eylem.";
};

const startTyping = () => {
  // Önceki animasyonu temizle
  if (typingInterval) {
    clearInterval(typingInterval);
  }

  const greeting = getGreeting();
  displayedText.value = "";
  currentIndex = 0;
  showCursor.value = true;

  typingInterval = setInterval(() => {
    if (currentIndex < greeting.length) {
      displayedText.value += greeting[currentIndex];
      currentIndex++;
    } else {
      clearInterval(typingInterval);
      showCursor.value = false;
    }
  }, 100);
};

// Dil değişikliğini dinle
const handleLanguageChange = () => {
  const newLang = localStorage.getItem("language") || "tr";
  currentLang.value = newLang;
  startTyping();
};

onMounted(() => {
  startTyping();
  window.addEventListener("languageChanged", handleLanguageChange);
});

onUnmounted(() => {
  window.removeEventListener("languageChanged", handleLanguageChange);
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
