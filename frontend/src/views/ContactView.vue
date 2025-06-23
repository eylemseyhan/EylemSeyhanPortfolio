<template>
  <main class="min-h-[calc(100vh-200px)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8" aria-label="İletişim">
    <section aria-labelledby="contact-title" class="max-w-2xl mx-auto">
      <div
        v-motion="{
          initial: { opacity: 0, y: 30 },
          enter: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 200 } }
        }"
      >
        <h1 id="contact-title" class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
          İletişime Geç
        </h1>
      </div>
      <div class="bg-dark-lighter/50 backdrop-blur rounded-2xl border border-gray-600 p-4 sm:p-6 lg:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6" aria-label="İletişim Formu">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Ad Soyad</label>
            <input
              id="name"
              type="text"
              v-model="form.name"
              required
              maxlength="50"
              class="w-full px-3 sm:px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300 text-sm sm:text-base"
              aria-required="true"
              autocomplete="name"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">E-posta</label>
            <input
              id="email"
              type="email"
              v-model="form.email"
              required
              maxlength="100"
              class="w-full px-3 sm:px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300 text-sm sm:text-base"
              aria-required="true"
              autocomplete="email"
            />
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">Telefon (Opsiyonel)</label>
            <input
              id="phone"
              type="tel"
              v-model="form.phone"
              maxlength="15"
              placeholder="+90 5XX XXX XX XX"
              class="w-full px-3 sm:px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300 text-sm sm:text-base"
              autocomplete="tel"
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Mesajınız</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              maxlength="500"
              required
              placeholder="Mesajınızı buraya yazın..."
              class="w-full px-3 sm:px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300 text-sm sm:text-base resize-none"
              aria-required="true"
            ></textarea>
            <div class="text-xs text-gray-500 mt-1 text-right">
              {{ form.message.length }}/500 karakter
            </div>
          </div>
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 rounded-lg font-medium disabled:opacity-50 hover:scale-105 ring-2 ring-transparent hover:ring-purple-500 flex items-center justify-center gap-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Formu Gönder"
          >
            <svg v-if="loading" class="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <svg v-else class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            {{ loading ? 'Gönderiliyor...' : 'Gönder' }}
          </button>
        </form>
        <!-- Başarı ve hata mesajları -->
        <transition name="fade">
          <div v-if="success" class="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500 shadow-lg animate-fade-in mt-6">
            <svg class="w-6 h-6 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-base font-semibold">Mesajınız başarıyla gönderildi! En kısa sürede size döneceğim.</span>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="error" class="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 shadow-lg animate-fade-in mt-6">
            <svg class="w-6 h-6 text-red-500 animate-shake" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span class="text-base font-semibold">{{ error }}</span>
          </div>
        </transition>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { sendContactForm } from '@/api'

// Form state
const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref('')

const isFormValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    form.value.name.trim() !== '' &&
    form.value.email.trim() !== '' &&
    emailRegex.test(form.value.email) &&
    form.value.message.trim() !== '' &&
    form.value.name.length <= 50 &&
    form.value.email.length <= 100 &&
    form.value.message.length >= 10
  )
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = 'Lütfen tüm alanları doğru şekilde doldurun.'
    setTimeout(() => error.value = '', 3000);
    return
  }

  loading.value = true
  error.value = ''
  success.value = false

  try {
    // Backend API'ye gönder
    await sendContactForm(form.value)

    success.value = true
    form.value = { name: '', email: '', phone: '', message: '' }
    
    setTimeout(() => {
      success.value = false
    }, 5000)
    
  } catch (err) {
    console.error('Error sending message:', err)
    error.value = err.message || 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
    setTimeout(() => error.value = '', 5000);
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animated-border {
  position: relative;
  z-index: 0;
}
.animated-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(270deg, #a21caf, #06b6d4, #c026d3, #a21caf);
  background-size: 600% 600%;
  animation: borderAnim 8s ease infinite;
  z-index: -1;
}
@keyframes borderAnim {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
.animate-shake {
  animation: shake 0.5s;
}
</style> 