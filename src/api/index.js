const API_BASE_URL =
    import.meta.env.VITE_API_URL || "";

// Timeout ayarları - Cache warming ile optimize edildi
const TIMEOUT_MS = 15000; // 15 saniye

// Fetch wrapper with timeout
const fetchWithTimeout = async(url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
            throw new Error("İstek zaman aşımına uğradı. Lütfen tekrar deneyin.");
        }
        throw error;
    }
};

/**
 * Projeleri getiren fonksiyon
 * @param {string} language - 'tr' veya 'en'
 * @returns {Promise<any>}
 */
export const fetchProjects = async(language = "tr") => {
    try {
        const response = await fetchWithTimeout(
            `${API_BASE_URL}/api/projects?lang=${language}`
        );
        if (!response.ok) {
            throw new Error("Projeler alınamadı.");
        }
        const projects = await response.json();

        // Dil desteği için projeleri işle
        return projects.map((project) => ({
            ...project,
            title: language === "en" && project.titleEn ? project.titleEn : project.title,
            description: language === "en" && project.descriptionEn ?
                project.descriptionEn :
                project.description,
        }));
    } catch (error) {
        console.error("Projects fetch error:", error);
        throw new Error(error.message || "Projeler yüklenirken bir hata oluştu.");
    }
};

/**
 * Tek bir projeyi getiren fonksiyon
 * @param {string} projectId
 * @param {string} language - 'tr' veya 'en'
 * @returns {Promise<any>}
 */
export const fetchProjectById = async(projectId, language = "tr") => {
    try {
        const response = await fetchWithTimeout(
            `${API_BASE_URL}/api/projects/${projectId}?lang=${language}`
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Proje bulunamadı.");
        }
        const project = await response.json();

        // Dil desteği için projeyi işle
        return {
            ...project,
            title: language === "en" && project.titleEn ? project.titleEn : project.title,
            description: language === "en" && project.descriptionEn ?
                project.descriptionEn :
                project.description,
        };
    } catch (error) {
        console.error("Project fetch error:", error);
        throw new Error(error.message || "Proje yüklenirken bir hata oluştu.");
    }
};

/**
 * İletişim formunu gönderen fonksiyon
 * @param {object} formData
 * @returns {Promise<any>}
 */
export const sendContactForm = async(formData) => {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Mesaj gönderilirken bir hata oluştu.");
        }
        return data;
    } catch (error) {
        console.error("Contact form error:", error);
        throw new Error(error.message || "Mesaj gönderilirken bir hata oluştu.");
    }
};