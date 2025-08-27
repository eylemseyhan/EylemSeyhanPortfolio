<script setup>
// Sosyal medya ikonları ve linkleri
const socials = [
  {
    href: "https://www.linkedin.com/in/eylem-seyhan/",
    label: "LinkedIn",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    href: "https://github.com/eylemseyhan",
    label: "GitHub",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24"><path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  },
  {
    href: "https://eylemseyhan.medium.com",
    label: "Medium",
    icon: `<svg viewBox="0 0 1043.63 592.71" aria-hidden="true" width="24" height="24"><g><path fill="#000000" d="M588.67 296.14c0 163.51-131.29 296.14-293.33 296.14S2 459.65 2 296.14 133.29 0 295.33 0s293.34 132.63 293.34 296.14zM800.29 296.14c0 144.19-64.47 261.13-144.01 261.13s-144-116.94-144-261.13 64.46-261.13 144-261.13 144.01 116.94 144.01 261.13zM1041.63 296.14c0 129.6-28.81 234.65-64.33 234.65s-64.33-105.05-64.33-234.65 28.81-234.65 64.33-234.65 64.33 105.05 64.33 234.65z"/></g></svg>`,
  },
];
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
/* Component-specific styles only */
/* Ortak stiller artık shared dosyalarda */
</style>
