<script setup>
// Sosyal medya ikonları ve linkleri
const socials = [
  {
    href: 'https://linkedin.com/in/eylemseyhan',
    label: 'LinkedIn',
    icon: `<svg viewBox="0 0 24 24" fill="#fafafa" aria-hidden="true"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 19h-2.5v-9h2.5v9zm-1.25-10.29c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12.25 10.29h-2.5v-4.5c0-1.07-.93-2-2-2s-2 .93-2 2v4.5h-2.5v-9h2.5v1.29c.36-.64 1.36-1.29 2.5-1.29 1.93 0 3.5 1.57 3.5 3.5v5.5z"/></svg>`
  },
  {
    href: 'https://github.com/eylemseyhan',
    label: 'GitHub',
    icon: `<svg viewBox="0 0 24 24" fill="#fafafa" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.3c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.8 1.2 1.8 1.2 1 .1 2.8.9 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4 1 0 2 .1 2.9.4 2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.3.8 1 .8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9 0-6.35-5.15-11.5-11.5-11.5z"/></svg>`
  },
  {
  href: 'https://eylemseyhan.medium.com',
  label: 'Medium',
  icon: `<svg viewBox="0 0 1043.63 592.71" aria-hidden="true" width="24" height="24"><g><path d="M588.67 296.14c0 163.51-131.29 296.14-293.33 296.14S2 459.65 2 296.14 133.29 0 295.33 0s293.34 132.63 293.34 296.14zM800.29 296.14c0 144.19-64.47 261.13-144.01 261.13s-144-116.94-144-261.13 64.46-261.13 144-261.13 144.01 116.94 144.01 261.13zM1041.63 296.14c0 129.6-28.81 234.65-64.33 234.65s-64.33-105.05-64.33-234.65 28.81-234.65 64.33-234.65 64.33 105.05 64.33 234.65z" fill="#000000"/></g></svg>`
}
]
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-4">

    
    <div class="flex justify-center items-center gap-6">
      <a
        v-for="social in socials"
        :key="social.label"
        :href="social.href"
        target="_blank"
        class="social-item cursor-hover transition-all duration-500 ease-out hover:scale-110 hover:drop-shadow-[0_0_20px_#06b6d4]"
        :aria-label="social.label"
        v-html="social.icon"
      >
      </a>
    </div>
  </div>
</template>

<style scoped>
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

.social-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;  /* 64px */
  height: 4rem; /* 64px */
  background-color: #1a1a1a; /* Koyu arka plan */
  color: #fafafa; /* İkon rengi */
  box-shadow: 
    0 0 20px rgba(255, 255, 255, 0.15),
    inset 0 0 12px rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
}

.social-item svg {
  width: 1.8rem;  /* 28px */
  height: 1.8rem; /* 28px */
  transition: all 0.3s ease-in-out;
  fill: #fafafa;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
}

.social-item:hover {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
  border-color: rgba(6, 182, 212, 0.6);
  box-shadow: 
    0 0 30px rgba(6, 182, 212, 0.4),
    inset 0 0 30px rgba(6, 182, 212, 0.2);
}

.social-item:hover svg {
  transform: scale(1.1);
}

/* Neon glow for title */
.neon-glow {
  text-shadow:
    0 0 8px #a78bfa,
    0 0 16px #a78bfa99,
    0 0 32px #67e8f966;
}

.social-item[aria-label='Medium'] {
  background-color: #ffffff; /* Beyaz arka plan */
  box-shadow:
    0 0 20px rgba(0, 0, 0, 0.1),
    inset 0 0 12px rgba(0, 0, 0, 0.05);
}

.social-item[aria-label='Medium'] svg {
  filter: none; /* drop-shadow'ı kaldırıyoruz */
}
</style>
