<template>
  <main
    class="relative min-h-screen flex flex-col items-center justify-center font-sans text-white overflow-hidden px-4 sm:px-6 lg:px-8"
    aria-label="Ana Sayfa İçeriği"
  >
    <!-- Hero -->
    <section class="hero-section w-full min-h-[60vh] flex flex-col justify-center items-center">
      <Hero>
        <template #buttons>
          <ContactButtons />
        </template>
      </Hero>
    </section>

    <!-- Sosyal medya hemen Hero'nun altında -->
    <section ref="socialSection" class="section w-full py-8">
      <SocialBar />
    </section>
    
    <!-- About Me -->
    <section ref="aboutSection" class="section w-full py-6">
      <AboutMe />
    </section>

    <!-- Teknolojiler bölümü -->
    <section ref="techSection" class="section w-full py-6">
      <Technologies />
    </section>

    <!-- Projeler bölümü -->
    <section ref="projectsSection" class="section w-full py-6">
      <ProjectsSlider />
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Technologies from '../components/Technologies.vue'
import ContactButtons from '../components/ContactButtons.vue'
import SocialBar from '../components/SocialBar.vue'
import ProjectsSlider from '../components/ProjectsSlider.vue'
import Hero from '../components/Hero.vue'
import AboutMe from '../components/AboutMe.vue'

const aboutSection = ref(null)
const socialSection = ref(null)
const techSection = ref(null)
const projectsSection = ref(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Tüm bölümler için basit fade-in animasyonu
  const sections = [aboutSection, socialSection, techSection, projectsSection]
  
  sections.forEach((section, index) => {
    gsap.fromTo(section.value,
      { 
        opacity: 0, 
        y: 30 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.value,
          start: 'top 80%',
          end: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })
})
</script>

<style scoped>
.hero-section {
  min-height: 60vh;
  position: relative;
  z-index: 10;
}

.section {
  opacity: 0;
  transform: translateY(30px);
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Mobil uyumluluk */
@media (max-width: 768px) {
  .section {
    padding: 2rem 1rem;
  }
}
</style> 