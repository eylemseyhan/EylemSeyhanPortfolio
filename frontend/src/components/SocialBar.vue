<script setup>
// Sosyal medya ikonları ve linkleri
const socials = [
  {
    href: 'https://linkedin.com/in/eylemseyhan',
    label: 'LinkedIn',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 19h-2.5v-9h2.5v9zm-1.25-10.29c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12.25 10.29h-2.5v-4.5c0-1.07-.93-2-2-2s-2 .93-2 2v4.5h-2.5v-9h2.5v1.29c.36-.64 1.36-1.29 2.5-1.29 1.93 0 3.5 1.57 3.5 3.5v5.5z"/></svg>`
  },
  {
    href: 'https://github.com/eylemseyhan',
    label: 'GitHub',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.3c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.8 1.2 1.8 1.2 1 .1 2.8.9 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4 1 0 2 .1 2.9.4 2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.3.8 1 .8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9 0-6.35-5.15-11.5-11.5-11.5z"/></svg>`
  }
]
</script>

<template>
  <nav class="fixed left-4 top-1/2 -translate-y-1/2 z-20">
    <div class="social-box">
      <a
        v-for="social in socials"
        :key="social.label"
        :href="social.href"
        target="_blank"
        class="item"
        :aria-label="social.label"
        v-html="social.icon"
      >
      </a>
    </div>
  </nav>
</template>

<style>
/* Register the custom property for the animation */
@property --fill-color {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 0%;
}

.social-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.social-box .item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;  /* 56px */
  height: 3.5rem; /* 56px */
  color: #c5c5c5;
  background-color: #242529;
  border-radius: 50%;
  transition: color 0.2s ease-in-out, box-shadow 0.4s ease-in-out;
}

.social-box .item svg {
  width: 1.5rem;  /* 24px */
  height: 1.5rem; /* 24px */
  transition: transform 0.4s ease-in-out;
}

.social-box .item:hover {
  color: #06b6d4; /* Cyan-500 from the gradient */
  --fill-color: 100%;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.7);
}

.social-box .item:hover svg {
  transform: scale(1.2);
}

/* The animated gradient border effect */
.social-box .item::after {
  position: absolute;
  z-index: -1;
  content: "";
  inset: -3px;
  border-radius: inherit;

  /* Use a static gradient and animate a mask to reveal it */
  background: linear-gradient(to bottom right, #8b5cf6, #06b6d4, #ec4899); /* purple-500, cyan-500, pink-500 */
  mask: conic-gradient(black var(--fill-color), transparent var(--fill-color));
  -webkit-mask: conic-gradient(black var(--fill-color), transparent var(--fill-color));
  
  transition: --fill-color 0.4s ease-in-out;
}
</style>
