<template>
  <main
    class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden"
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
        <span>Projelere Geri Dön</span>
      </button>
    </div>

    <div
      v-if="loading"
      class="text-center text-white animate-pulse mt-32 text-xl font-semibold"
    >
      <p>Proje yükleniyor...</p>
    </div>
    <div
      v-else-if="error"
      class="text-center text-pink-400 mt-32 text-lg font-semibold"
    >
      <p>Proje yüklenirken bir hata oluştu: {{ error }}</p>
    </div>
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
            :alt="project.title"
            class="mx-auto rounded-2xl shadow-xl max-h-72 object-contain bg-gray-800 border-2 border-cyan-400/30 neon-img"
          />
        </div>
        <h1
          class="text-4xl sm:text-5xl font-extrabold gradient-text-glow mb-4 tracking-tight font-sans"
        >
          {{ project.title }}
        </h1>
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <span
            v-for="tech in project.technologies"
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
            <span>Canlı Demo</span>
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
        <p>{{ project.description }}</p>
      </section>

      <!-- Image Gallery -->
      <section>
        <h2 class="text-2xl font-bold text-center mb-6 gradient-text-glow">
          Ekran Görüntüleri
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(image, index) in project.images"
            :key="index"
            class="relative rounded-xl overflow-hidden neon-img transition-transform duration-300 bg-[#18122B]/60 group"
            @click="openModal(image)"
          >
            <img
              :src="image.url"
              :alt="image.caption || project.title"
              :class="[
                'w-full h-auto object-cover transition-transform duration-300 transition-opacity group-hover:scale-110 group-hover:opacity-80',
                projectId === 'kfgeqMroj8N8zqQKAI82' ? 'max-h-64' : '',
              ]"
              style="cursor: pointer"
            />
            <p
              v-if="image.caption"
              class="p-2 text-sm text-center text-cyan-300 bg-[#23244d]/60 font-mono"
            >
              {{ image.caption }}
            </p>
          </div>
        </div>

        <!-- Modal -->
        <div
          v-if="modalImage"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          @click.self="closeModal"
        >
          <div class="relative max-w-3xl w-full mx-4">
            <img
              :src="modalImage.url"
              :alt="modalImage.caption || project.title"
              class="w-full h-auto rounded-2xl shadow-2xl border-2 border-cyan-400/40"
            />
            <!-- Çarpı (Kapat) İkonu -->
            <button
              @click="closeModal"
              class="absolute top-2 right-2 bg-black/60 rounded-full p-2 text-cyan-200 hover:bg-cyan-700/80 transition"
              aria-label="Kapat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <p
              v-if="modalImage.caption"
              class="p-2 text-center text-cyan-200 font-mono"
            >
              {{ modalImage.caption }}
            </p>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProject } from "@/composables/useProject";

const route = useRoute();
const router = useRouter();
const projectId = route.params.id;
const { project, loading, error, loadProject } = useProject(projectId);

const modalImage = ref(null);

function goBack() {
  router.push("/projects");
}

function openModal(image) {
  modalImage.value = image;
}
function closeModal() {
  modalImage.value = null;
}

// ESC ile modal kapansın
function handleKeydown(e) {
  if (e.key === "Escape") closeModal();
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});

onMounted(loadProject);
</script>

<style scoped>
/* Component-specific styles only */
/* Ortak stiller artık shared dosyalarda */
</style>
