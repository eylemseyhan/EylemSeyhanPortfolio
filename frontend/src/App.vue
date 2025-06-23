<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { defineAsyncComponent, Suspense } from 'vue'
import Hero from './components/Hero.vue'
import Cursor from './components/Cursor.vue'
// Koyu mod
const isDark = useDark()
const toggleDarkMode = useToggle(isDark)
const navOpen = ref(false)

</script>

<template>
  <Cursor />
  <div class="min-h-screen bg-background text-white font-sans flex flex-col">
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4
                bg-gray-900/80 backdrop-blur shadow-md z-50  transition-all duration-300">
      <!-- Brand -->
      <router-link to="/" class="text-lg sm:text-xl font-bold text-accent"></router-link>

      <!-- Nav items -->
      <ul class="hidden md:flex gap-10 items-center">
        <li>
          <router-link to="/" class="nav-modern group" exact-active-class="active-link">ana sayfa</router-link>
        </li>
        <li>
          <router-link to="/projects" class="nav-modern group" exact-active-class="active-link">projeler</router-link>
        </li>
        <li>
          <router-link to="/contact" class="nav-modern group" exact-active-class="active-link">iletişim</router-link>
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

    <!-- Mobile Menu -->
    <div v-if="navOpen" class="md:hidden fixed top-16 left-0 w-full bg-gray-900/95 backdrop-blur shadow-lg z-40 transition-all duration-300">
      <ul class="flex flex-col items-center py-6 space-y-4">
        <li>
          <router-link to="/" class="nav-modern-mobile" exact-active-class="active-link" @click="navOpen = false">ana sayfa</router-link>
        </li>
        <li>
          <router-link to="/projects" class="nav-modern-mobile" exact-active-class="active-link" @click="navOpen = false">projeler</router-link>
        </li>
        <li>
          <router-link to="/contact" class="nav-modern-mobile" exact-active-class="active-link" @click="navOpen = false">iletişim</router-link>
        </li>
      </ul>
    </div>

    <Transition
      name="page"
      mode="out-in"
      appear
    >
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </Transition>

    <!-- Footer -->
    <footer class="w-full text-xs text-gray-500 text-center py-4 border-t border-gray-800 bg-gray-900">
      © {{ new Date().getFullYear() }} Eylem. Tüm hakları saklıdır.
    </footer>
  </div>
</template>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1);
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.page-enter-to, .page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.nav-modern {
  @apply relative text-lg font-sans font-semibold tracking-wider lowercase px-2 py-1 transition-all duration-300;
  background: linear-gradient(90deg, #67e8f9, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 6px #a78bfa66);
  cursor: pointer;
}

.nav-modern .active-link,
.nav-modern:focus,
.nav-modern:hover {
  filter: drop-shadow(0 0 12px #a78bfa99);
}

.nav-modern .active-link {
  /* Aktif linkte gradient daha belirgin olabilir */
  background: linear-gradient(90deg, #5eead4, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-modern::after {
  content: '';
  display: block;
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #67e8f9, #a78bfa);
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
  transform-origin: left;
  border-radius: 2px;
}

.nav-modern:hover::after,
.nav-modern.active-link::after {
  transform: scaleX(1);
}

.nav-modern-mobile {
  @apply relative text-lg font-sans font-semibold tracking-wider lowercase px-4 py-2 transition-all duration-300;
  background: linear-gradient(90deg, #67e8f9, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 6px #a78bfa66);
  cursor: pointer;
}

.nav-modern-mobile:hover,
.nav-modern-mobile.active-link {
  filter: drop-shadow(0 0 12px #a78bfa99);
  background: linear-gradient(90deg, #5eead4, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
