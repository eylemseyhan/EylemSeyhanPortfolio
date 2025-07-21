<template>
  <nav
    aria-label="Hızlı Erişim Butonları"
    class="flex justify-center font-sans py-10"
  >
    <a
      href="/cv/EylemSeyhanCV.pdf"
      download="Eylem-Seyhan-CV"
      class="cv-button group"
      aria-label="CV'mi İndir"
    >
      <!-- Sparkles will be generated here by CSS -->
      <span class="sparkle"></span>
      <span class="sparkle"></span>
      <span class="sparkle"></span>
      <span class="sparkle"></span>

      <!-- Text content with code brackets -->
      <span class="text-container">
        <span class="bracket left">&lt;</span>
        CV'mi indir
        <span class="bracket right">&gt;</span>
      </span>
    </a>
  </nav>
</template>

<style scoped>
/* Keyframe animations for the effects */
@keyframes sparkle-anim {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 10px 5px rgba(203, 157, 209, 0.6),
      0 0 10px 2px rgba(228, 226, 228, 0.7);
  }
  50% {
    box-shadow: 0 0 20px 10px rgba(234, 233, 234, 0.8),
      0 0 20px 5px rgba(238, 237, 238, 0.9);
  }
}

/* Main button styling */
.cv-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  overflow: visible; /* Important for sparkles to show outside */
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 50px; /* Bubbly, friendly shape */
  background: linear-gradient(45deg, #c026d3, #22d3ee);

  box-shadow: 0 8px 25px rgba(162, 28, 175, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateY(0);
}

.cv-button:hover {
  transform: translateY(-5px) scale(1.05);
  animation: glow-pulse 2.5s infinite ease-in-out;
}

/* Text and bracket styling */
.text-container {
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.bracket {
  display: inline-block;
  opacity: 0.6;
  font-weight: 400;
  transition: all 0.3s ease;
}

.cv-button:hover .bracket {
  opacity: 1;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.cv-button:hover .bracket.left {
  transform: translateX(-4px);
}

.cv-button:hover .bracket.right {
  transform: translateX(4px);
}

/* --- Sparkle Effect --- */
.sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #e4d6e6; /* Light purple sparkle */
  border-radius: 50%;
  box-shadow: 0 0 5px #fff, 0 0 10px #f0abfc;
  opacity: 0;
  pointer-events: none;
  z-index: 3;
}

/* Trigger sparkle animation on parent hover */
.cv-button:hover .sparkle {
  animation-name: sparkle-anim;
  animation-duration: 0.8s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

/* Position and delay each sparkle for a random effect */
.sparkle:nth-of-type(1) {
  top: -15px;
  left: 20%;
  animation-delay: 0.1s;
}
.sparkle:nth-of-type(2) {
  top: 70%;
  left: -10px;
  animation-delay: 0.3s;
  width: 6px;
  height: 6px;
}
.sparkle:nth-of-type(3) {
  top: 25%;
  right: -15px;
  animation-delay: 0.5s;
}
.sparkle:nth-of-type(4) {
  bottom: -10px;
  right: 30%;
  animation-duration: 1s;
  animation-delay: 0.2s;
  width: 10px;
  height: 10px;
}
</style>
