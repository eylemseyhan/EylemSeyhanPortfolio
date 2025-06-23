<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { defineAsyncComponent, Suspense } from 'vue'
import Hero from './components/Hero.vue'
// Koyu mod
const isDark = useDark()
const toggleDarkMode = useToggle(isDark)
const navOpen = ref(false)

</script>

<template>
  <div class="min-h-screen bg-background text-white font-sans flex flex-col">
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4
                bg-gray-900/80 backdrop-blur shadow-md z-50  transition-all duration-300">
      <!-- Brand -->
      <router-link to="/" class="text-lg sm:text-xl font-bold text-accent"></router-link>

      <!-- Nav items -->
      <ul class="hidden md:flex gap-6 items-center">
        <li><router-link to="/" active-class="text-cyan-400">Ana Sayfa</router-link></li>
        <li><router-link to="/projects" active-class="text-teal-400">Projeler</router-link></li>
        <li><router-link to="/contact" active-class="text-teal-400">İletişim</router-link></li>
        <li>
          <button @click="toggleDarkMode" class="p-2">
            <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-400" />
            <MoonIcon v-else class="w-5 h-5 text-teal-400" />
          </button>
        </li>
      </ul>

      <!-- Mobile -->
      <button class="md:hidden" @click="navOpen = !navOpen">
        <svg v-if="!navOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <router-view />

    <!-- Footer -->
    <footer class="w-full text-xs text-gray-500 text-center py-4 border-t border-gray-800 bg-gray-900">
      © {{ new Date().getFullYear() }} Eylem. Tüm hakları saklıdır.
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
