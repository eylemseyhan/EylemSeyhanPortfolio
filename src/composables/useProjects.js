import { ref, onMounted, onUnmounted } from "vue";
import { fetchProjects } from "@/api";

export function useProjects() {
    const projects = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const retryCount = ref(0);
    const maxRetries = 3;
    const currentLang = ref(localStorage.getItem("language") || "tr");

    const loadProjects = async() => {
        loading.value = true;
        error.value = null;
        try {
            projects.value = await fetchProjects(currentLang.value);
            retryCount.value = 0; // Başarılı olursa retry sayacını sıfırla
        } catch (err) {
            error.value = err;
            console.error("Failed to fetch projects:", err);

            // Retry mekanizması
            if (retryCount.value < maxRetries) {
                retryCount.value++;
                console.log(`Retrying... Attempt ${retryCount.value}/${maxRetries}`);
                setTimeout(() => {
                    loadProjects();
                }, 1000 * retryCount.value); // Exponential backoff
            }
        } finally {
            loading.value = false;
        }
    };

    const retry = () => {
        retryCount.value = 0;
        loadProjects();
    };

    // Dil değişikliğini dinle
    const handleLanguageChange = () => {
        const newLang = localStorage.getItem("language") || "tr";
        currentLang.value = newLang;
        loadProjects(); // Dil değiştiğinde projeleri yeniden yükle
    };

    onMounted(() => {
        loadProjects();
        window.addEventListener("languageChanged", handleLanguageChange);
    });

    onUnmounted(() => {
        window.removeEventListener("languageChanged", handleLanguageChange);
    });

    return {
        projects,
        loading,
        error,
        retry,
        retryCount,
    };
}