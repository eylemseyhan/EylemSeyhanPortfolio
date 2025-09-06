<template>
  <main
    class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden pt-24 sm:pt-28"
  >
    <!-- Geri Dönüş Butonu -->
    <div class="max-w-4xl mx-auto mb-6">
      <button
        @click="goBack"
        class="neon-btn-back flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>{{
          currentLang === "tr" ? "Projelere Geri Dön" : "Back to Projects"
        }}</span>
      </button>
    </div>

    <!-- Yükleniyor -->
    <div
      v-if="loading"
      class="text-center text-white animate-pulse mt-32 text-xl font-semibold"
    >
      <p>
        {{
          currentLang === "tr" ? "Proje yükleniyor..." : "Loading project..."
        }}
      </p>
    </div>

    <!-- Hata -->
    <div
      v-else-if="error"
      class="text-center text-pink-400 mt-32 text-lg font-semibold"
    >
      <p>
        {{
          currentLang === "tr"
            ? "Proje yüklenirken bir hata oluştu:"
            : "An error occurred while loading the project:"
        }}
        {{ error?.message ?? error }}
      </p>
    </div>

    <!-- Proje -->
    <article
      v-else-if="project"
      class="max-w-4xl mx-auto rounded-3xl shadow-2xl border border-cyan-400/20 p-8 backdrop-blur-md neon-fade-in"
    >
      <!-- Header -->
      <header class="mb-10 text-center">
        <div class="flex justify-center mb-6">
          <img
            v-if="project.coverImageUrl"
            :src="project.coverImageUrl"
            :alt="titleText"
            class="mx-auto rounded-2xl shadow-xl max-h-72 object-contain bg-gray-800 border-2 border-cyan-400/30 neon-img"
          />
        </div>
        <h1
          class="text-4xl sm:text-5xl font-extrabold gradient-text-glow mb-4 tracking-tight font-sans"
        >
          {{ titleText }}
        </h1>
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <span
            v-for="tech in project.technologies ?? []"
            :key="tech"
            class="tech-chip-neon"
          >
            {{ tech }}
          </span>
        </div>
        <div class="flex justify-center gap-4">
          <a
            v-if="project.projectUrl"
            :href="project.projectUrl"
            target="_blank"
            class="neon-btn"
          >
            <span>{{ currentLang === "tr" ? "Canlı Demo" : "Live Demo" }}</span>
          </a>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            class="neon-btn"
          >
            <span>GitHub</span>
          </a>
        </div>
      </header>

      <!-- Description -->
      <section
        class="prose prose-invert prose-lg max-w-none mb-12 text-white font-light neon-fade-in delay-100"
      >
        <p>{{ getProjectDescription(project) }}</p>
      </section>
    </article>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProject } from "@/composables/useProject";

const route = useRoute();
const router = useRouter();

const projectId = route.params.id;
const { project, loading, error, loadProject } = useProject(projectId);

const currentLang = ref(localStorage.getItem("language") || "tr");

// dil değişimi (navbar vs. tetikliyor)
const handleLanguageChange = () => {
  currentLang.value = localStorage.getItem("language") || "tr";
};

onMounted(() => {
  window.addEventListener("languageChanged", handleLanguageChange);
  loadProject();
});
onBeforeUnmount(() => {
  window.removeEventListener("languageChanged", handleLanguageChange);
});

// map/string ayırt etmeyen yardımcı
const localized = (value, lang) => {
  if (!value) return "";

  // Eğer object ise (Firestore map), direkt işle
  if (typeof value === "object" && value !== null) {
    return value[lang] ?? value.tr ?? Object.values(value)[0] ?? "";
  }

  // String ise JSON string olup olmadığını kontrol et
  if (typeof value === "string") {
    // JSON string olup olmadığını kontrol et (süslü parantez ile başlıyorsa)
    if (value.trim().startsWith("{") && value.trim().endsWith("}")) {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === "object" && parsed !== null) {
          return parsed[lang] ?? parsed.tr ?? Object.values(parsed)[0] ?? "";
        }
      } catch (e) {
        console.warn("JSON parse failed:", e.message);
      }
    }
    return value; // Normal string ise olduğu gibi döndür
  }

  return "";
};

// Proje açıklamasını al
const getProjectDescription = (project) => {
  if (!project || !project.description) return "";
  return localized(project.description, currentLang.value);
};

// computed başlık ve açıklama
const titleText = computed(() =>
  localized(project.value?.title, currentLang.value)
);
const descriptionText = computed(() =>
  localized(project.value?.description, currentLang.value)
);

function goBack() {
  router.push("/projects");
}
</script>

<style scoped>
.neon-btn-back {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
  background: linear-gradient(90deg, #23244d 60%, #22d3ee33 100%);
  border: 1px solid #a5f3fc44;
  box-shadow: 0 0 8px #67e8f955;
}
.neon-btn-back:hover {
  background: linear-gradient(90deg, #22d3ee33 0%, #a78bfa33 100%);
  border-color: #a5f3fc;
  box-shadow: 0 0 16px #a5f3fc99;
  transform: translateX(-4px);
}
.gradient-text-glow {
  background: linear-gradient(90deg, #67e8f9, #a78bfa 60%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 16px #a5f3fc88, 0 0 32px #a78bfa55;
  letter-spacing: 0.02em;
}
.tech-chip-neon {
  @apply px-3 py-1 rounded-full text-xs font-semibold;
  background: linear-gradient(135deg, #23244d 0%, #2d1e3a 100%);
  color: #fff;
  border: 1.5px solid #a5f3fc88;
  box-shadow: 0 0 8px 2px #a5f3fc55, 0 0 16px 4px #a78bfa33;
}
.neon-btn {
  @apply px-5 py-2 rounded-lg font-bold text-white bg-transparent border-2 border-cyan-400/60 transition-all duration-200;
  box-shadow: 0 0 12px #67e8f955, 0 0 32px #a78bfa33;
  background: linear-gradient(90deg, #23244d 60%, #22d3ee33 100%);
}
.neon-img {
  box-shadow: 0 0 24px 2px #67e8f955, 0 0 48px 8px #a78bfa33;
  border-radius: 1.25rem;
  border: 2px solid #a5f3fc33;
}
@keyframes neonFadeIn {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.neon-fade-in {
  animation: neonFadeIn 0.9s cubic-bezier(0.77, 0, 0.18, 1) both;
}
.neon-fade-in.delay-100 {
  animation-delay: 0.1s;
}
</style>
