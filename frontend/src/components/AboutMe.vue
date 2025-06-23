<template>
  <div class="w-full max-w-4xl mx-auto px-4">
    <h2 class="text-4xl sm:text-5xl font-extrabold text-center mb-8 font-sans tracking-wide text-white drop-shadow-[0_0_16px_#a78bfa] neon-glow cursor-hover transition-all duration-700 ease-out hover:scale-110 hover:skew-x-3 hover:translate-y-[-8px] hover:drop-shadow-[0_0_32px_#a78bfa] hover:tracking-wider">Deneyimlerim</h2>

    <div class="relative border-l border-white/20 pl-8 space-y-12">
      
      <div class="relative opacity-0 translate-y-10 transition-all duration-700 delay-100 animate-fade-in">
        <div class="absolute left-0 top-2 w-4 h-4 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full shadow-lg transform -translate-x-2"></div>
        <div class="ml-4">
          <p class="text-xl sm:text-2xl text-cyan-300 font-semibold">2025</p>
          <h3 class="text-3xl sm:text-4xl font-bold text-white cursor-hover transition-all duration-600 ease-out hover:scale-105 hover:skew-x-2 hover:translate-x-3 hover:drop-shadow-[0_0_20px_#06b6d4]">DDI Teknoloji – Part-time Developer</h3>
        </div>
      </div>

      <div class="relative opacity-0 translate-y-10 transition-all duration-700 delay-200 animate-fade-in">
        <div class="absolute left-0 top-2 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-lg transform -translate-x-2"></div>
        <div class="ml-4">
          <p class="text-xl sm:text-2xl text-cyan-300 font-semibold">2024</p>
          <h3 class="text-3xl sm:text-4xl font-bold text-white cursor-hover transition-all duration-600 ease-out hover:scale-105 hover:skew-x-2 hover:translate-x-3 hover:drop-shadow-[0_0_20px_#06b6d4]">Abdi İbrahim – AI Intern</h3>
        </div>
      </div>

      <div class="relative opacity-0 translate-y-10 transition-all duration-700 delay-300 animate-fade-in">
        <div class="absolute left-0 top-2 w-4 h-4 bg-gradient-to-br from-purple-300 to-blue-500 rounded-full shadow-lg transform -translate-x-2"></div>
        <div class="ml-4">
          <p class="text-xl sm:text-2xl text-cyan-300 font-semibold">2024</p>
          <h3 class="text-3xl sm:text-4xl font-bold text-white cursor-hover transition-all duration-600 ease-out hover:scale-105 hover:skew-x-2 hover:translate-x-3 hover:drop-shadow-[0_0_20px_#06b6d4]">Enerjisa Üretim – Intern</h3>
        </div>
      </div>

      <div class="relative opacity-0 translate-y-10 transition-all duration-700 delay-400 animate-fade-in">
        <div class="absolute left-0 top-2 w-4 h-4 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full shadow-lg transform -translate-x-2"></div>
        <div class="ml-4">
          <p class="text-xl sm:text-2xl text-cyan-300 font-semibold">2024</p>
          <h3 class="text-3xl sm:text-4xl font-bold text-white cursor-hover transition-all duration-600 ease-out hover:scale-105 hover:skew-x-2 hover:translate-x-3 hover:drop-shadow-[0_0_20px_#06b6d4]">Devlet Su İşleri – Intern</h3>
        </div>
      </div>

      <div class="relative opacity-0 translate-y-10 transition-all duration-700 delay-500 animate-fade-in">
        <div class="absolute left-0 top-2 w-4 h-4 bg-gradient-to-br from-indigo-400 to-cyan-400 rounded-full shadow-lg transform -translate-x-2"></div>
        <div class="ml-4">
          <p class="text-xl sm:text-2xl text-cyan-300 font-semibold">2021</p>
          <h3 class="text-3xl sm:text-4xl font-bold text-white cursor-hover transition-all duration-600 ease-out hover:scale-105 hover:skew-x-2 hover:translate-x-3 hover:drop-shadow-[0_0_20px_#06b6d4]">DenizBank – Denizaşırı Online Intern</h3>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.8s ease forwards;
}

/* Modern sinematik hover efektleri */
.cursor-hover {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.cursor-hover:hover {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 16px #a78bfa);
  }
  50% {
    filter: drop-shadow(0 0 24px #a78bfa) drop-shadow(0 0 32px #a78bfa);
  }
}

h2 {
  text-shadow:
    0 0 8px #a78bfa,
    0 0 16px #a78bfa99,
    0 0 32px #67e8f966;
}
</style>
