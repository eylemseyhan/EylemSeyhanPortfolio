// src/composables/useProjects.js
import { ref, onMounted, onUnmounted } from "vue";
import { fetchProjects } from "@/api";

export function useProjects() {
    const projects = ref([]); // UI'nin kullandığı: description -> string (seçili dile göre)
    const _raw = ref([]); // Orijinal veri (description map/string gelebilir)

    const loading = ref(true);
    const error = ref(null);
    const retryCount = ref(0);
    const maxRetries = 3;

    const currentLang = () => localStorage.getItem("language") || "tr";

    // description alanı: Map ise dilden seç, string ise aynen dön
    const pickDescription = (desc, lang) => {
        if (!desc) return "";
        if (typeof desc === "object") {
            return desc[lang] || desc.tr || Object.values(desc)[0] || "";
        }
        if (typeof desc === "string") return desc;
        return "";
    };

    const applyLanguage = () => {
        const lang = currentLang();
        projects.value = (_raw.value || []).map((p) => ({
            ...p,
            // title zaten string, dokunmuyoruz
            description: pickDescription(p.description, lang),
            technologies: Array.isArray(p.technologies) ? p.technologies : [],
        }));
    };

    const loadProjects = async() => {
        loading.value = true;
        error.value = null;
        try {
            const data = await fetchProjects();
            _raw.value = Array.isArray(data) ? data : [];
            applyLanguage(); // seçili dile göre description -> string
            retryCount.value = 0;
        } catch (err) {
            error.value = err;
            console.error("Failed to fetch projects:", err);
            if (retryCount.value < maxRetries) {
                retryCount.value++;
                setTimeout(loadProjects, 1000 * retryCount.value); // exponential backoff
            }
        } finally {
            loading.value = false;
        }
    };

    const retry = () => {
        retryCount.value = 0;
        loadProjects();
    };

    const handleLanguageChange = () => {
        applyLanguage(); // yeniden fetch yok; mevcut veriyi seçili dile göre yeniden yazar
    };

    onMounted(() => {
        loadProjects();
        window.addEventListener("languageChanged", handleLanguageChange);
    });

    onUnmounted(() => {
        window.removeEventListener("languageChanged", handleLanguageChange);
    });

    return { projects, loading, error, retry, retryCount };
}