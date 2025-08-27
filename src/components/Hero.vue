<template>
  <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <div class="text-center z-10">
      <h1 class="eylem">
        {{ displayedText }}<span v-if="showCursor" class="cursor"></span
        ><span v-else class="cursor stopped"></span>
      </h1>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const displayedText = ref("");
const showCursor = ref(true);
let currentIndex = 0;
let typingInterval = null;

const currentLang = ref(localStorage.getItem("language") || "tr");

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
/* Component-specific styles only */
/* Ortak stiller artık shared dosyalarda */
</style>
