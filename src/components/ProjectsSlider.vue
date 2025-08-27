<template>
  <div class="w-full max-w-4xl mx-auto mt-8 relative">
    <!-- Sol Ok -->
    <button
      class="slider-arrow left-0 -left-28"
      @click="goPrev"
      :aria-label="currentLang === 'tr' ? 'Önceki' : 'Previous'"
    >
      <span class="arrow-bg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 6L8 12L14 18"
            stroke="#a5f3fc"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
    <!-- Sağ Ok -->
    <button
      class="slider-arrow right-0 -right-28"
      @click="goNext"
      :aria-label="currentLang === 'tr' ? 'Sonraki' : 'Next'"
    >
      <span class="arrow-bg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M10 6L16 12L10 18"
            stroke="#a5f3fc"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
    <swiper
      ref="swiperRef"
      :modules="[Navigation, Pagination]"
      :slides-per-view="1"
      :space-between="30"
      :pagination="{ clickable: true }"
      :navigation="false"
      class="mySwiper"
      style="touch-action: pan-x"
      @swiper="onSwiper"
    >
      <swiper-slide v-for="(project, idx) in sliderProjects" :key="project.id">
        <div class="slider-card">
          <div class="w-full flex items-center justify-center gap-4 py-4">
            <div
              class="w-full aspect-w-16 aspect-h-9 flex items-center justify-center bg-gray-800 rounded-2xl overflow-hidden"
            >
              <img
                :src="project.coverImageUrl"
                :alt="project.title"
                class="max-h-full max-w-full object-contain cursor-pointer"
                @click="goDetail(project.id)"
              />
            </div>
          </div>
          <div class="p-6 w-full flex flex-col items-center">
            <h2
              class="text-2xl font-bold mb-2 gradient-text text-center font-sans tracking-tight"
            >
              {{ project.title }}
            </h2>
            <p class="text-gray-300 text-base mb-4 text-center">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4 justify-center">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="tech-chip"
              >
                {{ tech }}
              </span>
            </div>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              class="github-btn flex items-center justify-center bg-transparent shadow-none border-none p-0 hover:bg-transparent"
              @click.stop
              :aria-label="`GitHub: ${project.title}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  fill="white"
                  d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useProjects } from "@/composables/useProjects";

const currentLang = ref(localStorage.getItem("language") || "tr");

const { projects: allProjects, loading, error } = useProjects();
const swiperRef = ref(null);
const swiperInstance = ref(null);
const router = useRouter();

const sliderProjects = computed(() => allProjects.value.slice(0, 5));

function goPrev() {
  swiperInstance.value?.slidePrev();
}
function goNext() {
  swiperInstance.value?.slideNext();
}
function goDetail(id) {
  if (!id) return;
  router.push({ name: "project-detail", params: { id } });
}

function onSwiper(swiper) {
  swiperInstance.value = swiper;
}

// Dil değişikliğini dinle
const handleLanguageChange = () => {
  const newLang = localStorage.getItem("language") || "tr";
  currentLang.value = newLang;
};

onMounted(() => {
  window.addEventListener("languageChanged", handleLanguageChange);
});

onUnmounted(() => {
  window.removeEventListener("languageChanged", handleLanguageChange);
});

if (error.value) {
  console.error("Slider için projeler yüklenemedi:", error.value);
}
</script>

<style scoped>
/* Swiper özelleştirmeleri */
.mySwiper {
  --swiper-navigation-color: #22d3ee;
  --swiper-pagination-color: #a78bfa;
  padding-bottom: 2.5rem;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  display: none !important;
}

:root {
  --swiper-navigation-size: 44px;
}

.slider-arrow {
  @apply absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center;
  /* Oklar mobilde gizlenebilir */
  @apply hidden md:flex;
}

.arrow-bg {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #23244d 0%, #2d1e3a 100%);
  box-shadow: 0 2px 16px #67e8f955;
  border: 1.5px solid rgba(167, 139, 250, 0.18);
  backdrop-filter: blur(6px);
  opacity: 0.92;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.arrow-bg::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0px;
  height: 0px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
  z-index: 0;
  opacity: 0;
}

.slider-arrow:hover .arrow-bg::after {
  width: 180px;
  height: 180px;
  opacity: 1;
}

.slider-arrow:hover .arrow-bg {
  animation: jellyWobble 0.6s ease;
  transform: scale(1.05);
  background: radial-gradient(circle at 30% 30%, #a5f3fc66, #a78bfa55);
  box-shadow: 0 4px 20px rgba(165, 243, 252, 0.4),
    inset 0 0 8px rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
  filter: brightness(1.08);
}

.slider-arrow svg {
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 4px #a5f3fc88);
  transition: transform 0.3s ease;
}

@keyframes jellyWobble {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1, 0.9);
  }
  50% {
    transform: scale(0.9, 1.1);
  }
  75% {
    transform: scale(1.05, 0.95);
  }
  100% {
    transform: scale(1);
  }
}

.tech-chip {
  @apply px-3 py-1 rounded-full text-xs font-semibold;
  background: linear-gradient(135deg, #23244d 0%, #2d1e3a 100%);
  color: #ffff;
  box-shadow: 0 0 8px 2px #a5f3fc55, 0 0 16px 4px #a78bfa33;

  border-image: linear-gradient(90deg, #a5f3fc 0%, #a78bfa 100%) 1;
  transition: transform 0.2s, box-shadow 0.2s;
}
.tech-chip:hover {
  transform: scale(1.08) skewX(-6deg);
  box-shadow: 0 0 16px 4px #a5f3fc99, 0 0 32px 8px #a78bfa66;
  color: #fff;
  background: linear-gradient(90deg, #a5f3fc33 0%, #a78bfa33 100%);
}

.github-btn {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  min-width: 0;
  transition: transform 0.3s, box-shadow 0.3s, filter 0.3s;
}
.github-btn:hover {
  transform: scale(1.22);
}

:deep(.swiper-pagination-bullet) {
  background: #334155;
  opacity: 1;
  transition: background 0.3s, transform 0.3s;
}
:deep(.swiper-pagination-bullet-active) {
  background: #a5f3fc;
  transform: scale(1.2);
}

.gradient-text {
  background: linear-gradient(90deg, #67e8f9, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Mockup stilleri */
.macbook-mockup {
  border-radius: 18px 18px 12px 12px;
  border: 3px solid #444;
  box-shadow: 0 8px 32px 0 #a78bfa33, 0 0 0 8px #fff1;
  background: linear-gradient(180deg, #23244d 60%, #18181b 100%);
}
.iphone-mockup {
  border-radius: 32px;
  border: 3px solid #444;
  box-shadow: 0 8px 32px 0 #67e8f933, 0 0 0 8px #fff1;
  background: linear-gradient(180deg, #23244d 60%, #18181b 100%);
}
</style>
