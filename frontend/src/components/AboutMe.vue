<template>
  <div class="aboutme-container">
    <h2 class="aboutme-title cursor-hover">
      {{ currentLang === "tr" ? "Deneyimlerim" : "My Experience" }}
    </h2>
    <div class="timeline-zigzag">
      <div
        v-for="(exp, i) in experiences"
        :key="i"
        :class="['timeline-zigzag__container', i % 2 === 0 ? 'left' : 'right']"
      >
        <div :class="['timeline-zigzag__row', i % 2 === 0 ? 'right' : 'left']">
          <template v-if="i % 2 === 0">
            <div class="timeline-zigzag__dot"></div>
            <div class="timeline-zigzag__date right">{{ exp.date }}</div>
          </template>
          <template v-else>
            <div class="timeline-zigzag__date left">{{ exp.date }}</div>
            <div class="timeline-zigzag__dot"></div>
          </template>
        </div>
        <div class="timeline-zigzag__content">
          <h3>{{ exp.title }}</h3>
          <div class="company">{{ exp.company }}</div>
          <p>{{ exp.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

// Statik experiences array'leri
const trExperiences = [
  {
    title: "Part Time Developer",
    company: "DDI Teknoloji",
    date: "Nisan - Temmuz 2025",
    desc: "NLua ile entegre .NET modülleri için birim ve entegrasyon testleri geliştirdim ve bu scriptlerin kurulumu, kullanımı ve bakımıyla ilgili detaylı bir dokümantasyon hazırladım.",
  },
  {
    title: "Intern",
    company: "Enerjisa Üretim",
    date: "Ağustos - Eylül 2024",
    desc: "Power Plant App adlı uygulamayı .NET Core ve Identity ile geliştirerek authentication ve authorization süreçlerini güvenli hale getirdim. Kullanıcı yetkilerine göre santral ekleme, güncelleme ve detaylı veri görüntüleme gibi CRUD işlemleri gerçekleştirilebiliyor.",
  },
  {
    title: "Intern",
    company: "Devlet Su İşleri",
    date: "Temmuz - Ağustos 2024",
    desc: "ASP.NET MVC ile DSİ Athletic Club Management System adlı bir web uygulaması geliştirdim. Bu sistem, öğrenci kayıtlarını, spor branşlarını ve kurs katılımlarını yönetmek amacıyla tasarlandı. Projede Entity Framework ile veritabanı işlemlerini yönettim, kullanıcı arayüzünü HTML, CSS, JavaScript ve jQuery ile oluşturdum. Dashboard ekranında toplam öğrenci sayısı, aktif sporcular ve katılım oranı gibi istatistikleri görselleştirdim.",
  },
  {
    title: "AI Intern",
    company: "Abdi İbrahim",
    date: "Mart - Haziran 2024",
    desc: "PDF belgelerinden vektör indeksleme ve prompt engineering ile yanıtlar çıkaran, LangChain ve OpenAI tabanlı yapay zekâ destekli bir Soru-Cevap sistemi geliştirdim.",
  },
  {
    title: "Denizaşırı Online Intern",
    company: "DenizBank",
    date: "Kasım - Aralık 2021",
    desc: "Program süresince iletişimden insan kaynaklarına, bankacılık süreçlerinden dijital dönüşüme kadar birçok alanda uzmanlardan eğitimler aldım. Kahoot yarışmaları, vaka analizleri ve 'Birbirinden Öğrenme' oturumlarıyla interaktif bir deneyim yaşadım. Hazine, yatırım bankacılığı, risk yönetimi gibi teknik konularla ilgili sunumlara katılarak bankacılıkla ilgili genel bir perspektif kazandım.",
  },
];

const enExperiences = [
  {
    title: "Part Time Developer",
    company: "DDI Technology",
    date: "April - July 2025",
    desc: "I developed unit and integration tests for .NET modules integrated with NLua and prepared detailed documentation for the installation, usage and maintenance of these scripts.",
  },
  {
    title: "Intern",
    company: "Enerjisa Production",
    date: "August - September 2024",
    desc: "I developed the Power Plant App application with .NET Core and Identity, making authentication and authorization processes secure. CRUD operations such as adding, updating and detailed data viewing of power plants can be performed according to user permissions.",
  },
  {
    title: "Intern",
    company: "General Directorate of State Hydraulic Works",
    date: "July - August 2024",
    desc: "I developed a web application called DSİ Athletic Club Management System with ASP.NET MVC. This system was designed to manage student registrations, sports branches and course participations. I managed database operations with Entity Framework in the project, created the user interface with HTML, CSS, JavaScript and jQuery. I visualized statistics such as total number of students, active athletes and participation rate on the dashboard screen.",
  },
  {
    title: "AI Intern",
    company: "Abdi İbrahim",
    date: "March - June 2024",
    desc: "I developed an AI-powered Question-Answer system based on LangChain and OpenAI that extracts responses from PDF documents through vector indexing and prompt engineering.",
  },
  {
    title: "Overseas Online Intern",
    company: "DenizBank",
    date: "November - December 2021",
    desc: "During the program, I received training from experts in many areas from communication to human resources, from banking processes to digital transformation. I experienced an interactive experience with Kahoot competitions, case analyses and 'Learning from Each Other' sessions. I gained a general perspective on banking by participating in presentations on technical topics such as treasury, investment banking, and risk management.",
  },
];

// Mevcut dili localStorage'dan al
const currentLang = ref(localStorage.getItem("language") || "tr");

// Experiences'i dile göre seç
const experiences = computed(() => {
  return currentLang.value === "tr" ? trExperiences : enExperiences;
});

// Dil değişikliğini dinle
const handleLanguageChange = () => {
  const newLang = localStorage.getItem("language") || "tr";
  currentLang.value = newLang;
};

onMounted(() => {
  window.addEventListener("languageChanged", handleLanguageChange);
});

onUnmounted(() => {
  window.removeEventListener("languageChanged", handleLanguageChange);
});
</script>

<style scoped>
.aboutme-container {
  width: 100%;

  max-width: 100%;
  margin: 0 auto;
  padding-left: 2.5vw;
  padding-right: 2.5vw;

  border-radius: 1.5rem;
}
.aboutme-title {
  font-size: 2.25rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  font-family: "Lexend", Arial, sans-serif;
  letter-spacing: 0.04em;
  color: #f7d4fa;
  text-shadow: 0 2px 8px #c026d3, 0 8px 24px #a78bfa, 0 1px 0 #fff,
    0 0px 2px #fff;
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
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
.timeline-zigzag {
  position: relative;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}
.timeline-zigzag::after {
  content: "";
  position: absolute;
  width: 3px;
  background: linear-gradient(180deg, #67e8f9 0%, #a78bfa 100%);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1.5px;
  z-index: 0;
}
.timeline-zigzag__container {
  padding: 15px 30px;

  position: relative;
  background: inherit;
  width: 55%;
  min-width: 340px;
  max-width: 600px;
  min-height: 120px;
  display: flex;
  align-items: center;
  z-index: 2;
}
.timeline-zigzag__container.left {
  left: 0;
  justify-content: flex-end;
}
.timeline-zigzag__container.right {
  left: 50%;
  justify-content: flex-start;
}
.timeline-zigzag__row {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  width: 100%;
  z-index: 3;
  pointer-events: none;
}
.timeline-zigzag__row.right {
  flex-direction: row;
  left: 0;
}
.timeline-zigzag__row.left {
  flex-direction: row-reverse;
  right: 0;
}
.timeline-zigzag__dot {
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #67e8f9 0%, #a78bfa 100%);
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 12px #67e8f9, 0 0 24px #a78bfa55;
  z-index: 2;
}
.timeline-zigzag__dot {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #67e8f9 0%, #a78bfa 100%);
  border: 2px solid #fff;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 12px #67e8f9, 0 0 24px #a78bfa55;
}
.timeline-zigzag__container.right .timeline-zigzag__dot {
  left: 0%;
}

.timeline-zigzag__date {
  font-size: 1.08rem;
  font-weight: 700;
  color: #ffff;
  font-family: "Lexend", Arial, sans-serif;
  letter-spacing: 1px;
  background: none;
  box-shadow: none;
  border: none;
  padding: 0 12px;
  line-height: 1;
  white-space: nowrap;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.timeline-zigzag__date.left {
  right: calc(100% + 16px); /* KUTU SAĞDAYSAN TARİH SOLDA OLSUN */
  text-align: right;
}

.timeline-zigzag__date.right {
  left: calc(100% + 16px); /* KUTU SOLDAYSAN TARİH SAĞDA OLSUN */
  text-align: left;
}
.timeline-zigzag__content {
  padding: 30px 40px 30px 30px;
  background: rgba(24, 18, 43, 0.92);
  box-shadow: 0 0 16px #a5f3fc33;
  font-family: "Lexend", Arial, sans-serif;
  color: #e0e0ff;
  min-width: 220px;
  max-width: 420px;
  border-radius: 16px;
  position: relative;
  z-index: 2;
}
.timeline-zigzag__content h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(90deg, #a78bfa, #67e8f9 60%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  letter-spacing: 1px;
}
.timeline-zigzag__content .company {
  font-size: 1rem;
  color: #a78bfa;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 6px #a78bfa55;
}
.timeline-zigzag__content p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #e0e0ff;
  text-shadow: 0 0 4px #a5f3fc55;
}
@media (max-width: 1200px) {
  .timeline-zigzag {
    max-width: 100vw;
    padding: 1rem 0;
  }
  .timeline-zigzag__container {
    max-width: 95vw;
    min-width: 0;
    padding: 15px 10px;
  }
}
@media (max-width: 767.98px) {
  .timeline-zigzag::after {
    left: 24px;
  }
  .timeline-zigzag__container {
    width: 100%;
    padding-left: 60px;
    padding-right: 10px;
    min-height: 100px;
    max-width: 100vw;
    min-width: 0;
  }
  .timeline-zigzag__container.right {
    left: 0%;
  }
  .timeline-zigzag__dot {
    left: 24px !important;
    transform: translateY(-50%);
  }
  .timeline-zigzag__date.right {
    left: 60px !important;
    right: auto !important;
    text-align: left;
  }
  .timeline-zigzag__date.left {
    right: 60px !important;
    left: auto !important;
    text-align: right;
  }
  .timeline-zigzag__content {
    padding: 30px 20px 30px 30px;
    max-width: 90vw;
    min-width: 0;
  }
}
</style>
