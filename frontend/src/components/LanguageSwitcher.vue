<template>
  <div class="language-switcher">
    <button
      @click="changeLanguage('tr')"
      :class="{ active: currentLocale === 'tr' }"
      class="lang-btn"
    >
      TR
    </button>
    <button
      @click="changeLanguage('en')"
      :class="{ active: currentLocale === 'en' }"
      class="lang-btn"
    >
      EN
    </button>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

const currentLocale = ref(localStorage.getItem("language") || "tr");

const changeLanguage = (lang) => {
  currentLocale.value = lang;
  localStorage.setItem("language", lang);

  // Custom event ile diğer komponentleri bilgilendir
  window.dispatchEvent(new CustomEvent("languageChanged", { detail: lang }));
};

onMounted(() => {
  // Sayfa yüklendiğinde mevcut dili al
  const savedLang = localStorage.getItem("language");
  if (savedLang) {
    currentLocale.value = savedLang;
  }
});
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.lang-btn {
  padding: 0.4rem 0.8rem;

  background: transparent;
  color: #fafafa;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background-color: rgba(26, 26, 26, 0.8);
  font-size: 0.9rem;
}

.lang-btn:hover {
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.2) 0%,
    rgba(6, 182, 212, 0.2) 100%
  );
  border-color: rgba(6, 182, 212, 0.6);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
  transform: scale(1.05);
}

.lang-btn.active {
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.3) 0%,
    rgba(6, 182, 212, 0.3) 100%
  );
  border-color: #06b6d4;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

@media (max-width: 768px) {
  .language-switcher {
    gap: 0.3rem;
  }

  .lang-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>
