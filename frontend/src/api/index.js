const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Timeout ayarları
const TIMEOUT_MS = 10000; // 10 saniye

// Fetch wrapper with timeout
const fetchWithTimeout = async(url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
        }
        throw error;
    }
};

/**
 * Projeleri getiren fonksiyon
 * @returns {Promise<any>}
 */
export const fetchProjects = async() => {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/api/projects`);
        if (!response.ok) {
            throw new Error('Projeler alınamadı.');
        }
        return response.json();
    } catch (error) {
        console.error('Projects fetch error:', error);
        throw new Error(error.message || 'Projeler yüklenirken bir hata oluştu.');
    }
};

/**
 * Tek bir projeyi getiren fonksiyon
 * @param {string} projectId
 * @returns {Promise<any>}
 */
export const fetchProjectById = async(projectId) => {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/api/projects/${projectId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Proje bulunamadı.');
        }
        return response.json();
    } catch (error) {
        console.error('Project fetch error:', error);
        throw new Error(error.message || 'Proje yüklenirken bir hata oluştu.');
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Mesaj gönderilirken bir hata oluştu.');
        }
        return data;
    } catch (error) {
        console.error('Contact form error:', error);
        throw new Error(error.message || 'Mesaj gönderilirken bir hata oluştu.');
    }
};