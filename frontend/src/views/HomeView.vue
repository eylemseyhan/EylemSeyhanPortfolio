<template>
  <main
    class="relative min-h-screen flex flex-col items-center justify-center font-sans text-white overflow-hidden px-4 sm:px-6 lg:px-8"
    aria-label="Ana Sayfa İçeriği"
  >
  
    
    <!-- Hero bölümü ve buton slotu -->
    <Hero
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
    >
      <template #buttons>
        <ContactButtons />
      </template>
    </Hero>
    
    <!-- Sosyal bar -->
    <SocialBar
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 } }"
    />

    <!-- Teknolojiler bölümü - Kartın altında görünecek şekilde ayarlanabilir -->
    <Technologies
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
      class="mt-16"
    />

    <ProjectsSlider />
    
  </main>
</template>

<script setup>

import Technologies from '../components/Technologies.vue'
import ContactButtons from '../components/ContactButtons.vue'
import SocialBar from '../components/SocialBar.vue'
import ProjectsSlider from '../components/ProjectsSlider.vue'
import Hero from '../components/Hero.vue'

</script> 