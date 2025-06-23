<template>
  <section class="w-full min-h-[60vh] flex flex-col justify-center items-center text-center px-4 pt-24">
    <h1 class="eylem text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-thin">Hoş geldin, ben Eylem.</h1>
    <p class="text-lg font-light">Fullstack geliştiricisiyim. Modern, performanslı ve kullanıcı dostu arayüzler geliştiriyorum.</p>
    <slot name="buttons" />
  </section>
</template>

<script setup>

</script>

<style scoped>
.eylem,
.eylem * {
  box-sizing: border-box;
}
.eylem {
  color: #f7d4fa;
  text-align: center;
  font-family: 'Lexend', Arial, sans-serif;
  line-height: 84.39%;
  letter-spacing: -0.075em;
  font-weight: 100;
  position: relative;
  /* Blobby/puffy efekt için yumuşak gölgeler */
  text-shadow:
    0 2px 8px #c026d3,
    0 8px 24px #a78bfa,
    0 1px 0 #fff,
    0 0px 2px #fff;
  /* Gradient ve -webkit-text-fill-color kaldırıldı */
}

/* Responsive font sizes */
@media (min-width: 1024px) {
  .eylem {
    font-size: 170px; /* Masaüstü için büyük boyut */
  }
}

@media (max-width: 1023px) {
  .eylem {
    font-size: clamp(48px, 8vw, 120px); /* Mobil için responsive boyut */
  }
}
</style>
