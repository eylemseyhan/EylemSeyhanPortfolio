<template>
  <div class="w-full max-w-4xl mx-auto mt-16 relative">
    <!-- Sol Ok -->
    <button
      class="slider-arrow left-0"
      @click="goPrev"
      aria-label="Önceki"
    >
      <span class="arrow-bg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14 6L8 12L14 18" stroke="#a5f3fc" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>
    <!-- Sağ Ok -->
    <button
      class="slider-arrow right-0"
      @click="goNext"
      aria-label="Sonraki"
    >
      <span class="arrow-bg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M10 6L16 12L10 18" stroke="#a5f3fc" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>
    <swiper
      ref="swiperRef"
      :modules="[Navigation, Pagination]"
      :slides-per-view="1"
      :space-between="30"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="mySwiper"
    >
      <swiper-slide v-for="project in sliderProjects" :key="project.id">
        <div class="bg-gray-900/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center">
          <div class="w-full aspect-w-16 aspect-h-9 bg-gray-800 flex items-center justify-center">
            <img
              :src="project.coverImageUrl"
              :alt="project.title"
              class="max-h-full max-w-full object-contain"
            />
          </div>
          <div class="p-6 w-full flex flex-col items-center">
            <h2 class="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent text-center">{{ project.title }}</h2>
            <p class="text-gray-300 text-base mb-4 text-center">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4 justify-center">
              <span v-for="tech in project.technologies" :key="tech" class="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded-full">
                {{ tech }}
              </span>
            </div>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              class="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg text-xs font-semibold shadow hover:brightness-110 transition"
            >GitHub</a>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useProjects } from '@/composables/useProjects'

const { projects: allProjects, loading, error } = useProjects()
const swiperRef = ref(null)

const sliderProjects = computed(() => allProjects.value.slice(0, 5))

function goPrev() {
  swiperRef.value?.swiper?.slidePrev()
}
function goNext() {
  swiperRef.value?.swiper?.slideNext()
}

if (error.value) {
  console.error('Slider için projeler yüklenemedi:', error.value)
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
  @apply flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200;
  background: linear-gradient(135deg, #23244d 0%, #2d1e3a 100%);
  box-shadow: 0 2px 16px 0 #67e8f955, 0 0 0 0 #a78bfa00;
  border: 1.5px solid rgba(167, 139, 250, 0.18);
  backdrop-filter: blur(6px);
  opacity: 0.92;
  /* Hafif cam efekti */
}

.slider-arrow svg {
  @apply transition-transform duration-200;
  filter: drop-shadow(0 0 4px #a5f3fc88);
}

.slider-arrow:hover .arrow-bg {
  @apply scale-110;
  background: linear-gradient(135deg, #a5f3fc 0%, #a78bfa 100%);
  box-shadow: 0 0 32px 8px #a5f3fc66, 0 0 0 0 #a78bfa00;
  border-color: #a5f3fc;
  opacity: 1;
  filter: blur(1.5px) brightness(1.15);
}

.slider-arrow.left-0 { left: -2.5rem; }
.slider-arrow.right-0 { right: -2.5rem; }
</style> 