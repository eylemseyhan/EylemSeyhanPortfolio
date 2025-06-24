<template>
  <div class="aboutme-container">
    <h2 class="aboutme-title cursor-hover">Deneyimlerim</h2>
    <div class="aboutme-timeline">
      <div class="aboutme-timeline-item animate-fade-in delay-100">
        <div class="timeline-dot dot-cyan-purple"></div>
        <div class="timeline-card">
          <p class="timeline-year">Nisan - Haziran 2025</p>
          <h3 class="timeline-job cursor-hover">DDI Teknoloji – Part Time Developer</h3>
        </div>
      </div>
      
      <div class="aboutme-timeline-item animate-fade-in delay-300">
        <div class="timeline-dot dot-purple-blue"></div>
        <div class="timeline-card">
          <p class="timeline-year">Ağustos - Eylül 2024</p>
          <h3 class="timeline-job cursor-hover">Enerjisa Üretim – Intern</h3>
        </div>
      </div>
      <div class="aboutme-timeline-item animate-fade-in delay-400">
        <div class="timeline-dot dot-cyan-blue"></div>
        <div class="timeline-card">
          <p class="timeline-year">Temmuz - Ağustos 2024</p>
          <h3 class="timeline-job cursor-hover">Devlet Su İşleri – Intern</h3>
        </div>
      </div>
      <div class="aboutme-timeline-item animate-fade-in delay-200">
        <div class="timeline-dot dot-pink-purple"></div>
        <div class="timeline-card">
          <p class="timeline-year">Mart - Haziran 2024</p>
          <h3 class="timeline-job cursor-hover">Abdi İbrahim – AI Intern</h3>
        </div>
      </div>
      <div class="aboutme-timeline-item animate-fade-in delay-500">
        <div class="timeline-dot dot-indigo-cyan"></div>
        <div class="timeline-card">
          <p class="timeline-year">Kasım - Aralık 2021</p>
          <h3 class="timeline-job cursor-hover">DenizBank – Denizaşırı Online Intern</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aboutme-container {
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
.aboutme-title {
  font-size: 2.25rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Lexend', Arial, sans-serif;
  letter-spacing: 0.04em;
  color: #f7d4fa;
  text-shadow:
    0 2px 8px #c026d3,
    0 8px 24px #a78bfa,
    0 1px 0 #fff,
    0 0px 2px #fff;
  transition: all 0.7s cubic-bezier(.4,0,.2,1);
}
@media (min-width: 640px) {
  .aboutme-title {
    font-size: 3rem;
  }
}
@media (min-width: 1024px) {
  .aboutme-title {
    font-size: 3.75rem;
  }
}
.aboutme-timeline {
  position: relative;
  border-left: 1.5px solid rgba(255,255,255,0.18);
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
.aboutme-timeline-item {
  position: relative;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s cubic-bezier(.4,0,.2,1);
  display: flex;
  align-items: flex-start;
}
.timeline-dot {
  position: absolute;
  left: -1.25rem;
  top: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  box-shadow: 0 0 16px 4px rgba(167,139,250,0.4);
}
.dot-cyan-purple {
  background: linear-gradient(135deg, #06b6d4, #a78bfa);
}
.dot-pink-purple {
  background: linear-gradient(135deg, #ec4899, #a78bfa);
}
.dot-purple-blue {
  background: linear-gradient(135deg, #a78bfa, #38bdf8);
}
.dot-cyan-blue {
  background: linear-gradient(135deg, #67e8f9, #38bdf8);
}
.dot-indigo-cyan {
  background: linear-gradient(135deg, #818cf8, #67e8f9);
}
.timeline-card {
  margin-left: 1.5rem;
}
.timeline-year {
  font-size: 1.25rem;
  color: #67e8f9;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.timeline-job {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  transition: all 0.6s cubic-bezier(.4,0,.2,1);
}

/* Animasyonlar */
@keyframes fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.8s ease forwards;
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }

/* Modern sinematik hover efektleri */
.cursor-hover {
  transform-style: preserve-3d;
  perspective: 1000px;
}
.cursor-hover:hover {
  animation: glow-pulse 2s ease-in-out infinite;
  scale: 1.08;
  skew: 2deg;
  letter-spacing: 0.04em;
}
@keyframes glow-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 16px #a78bfa);
  }
  50% {
    filter: drop-shadow(0 0 24px #a78bfa) drop-shadow(0 0 32px #a78bfa);
  }
}
</style>
