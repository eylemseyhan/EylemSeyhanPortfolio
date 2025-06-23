import { ref, toValue } from 'vue'
import { fetchProjectById } from '@/api'

export function useProject(projectId) {
    const project = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const loadProject = async() => {
        loading.value = true
        error.value = null
        try {
            // toValue ile hem ref hem de normal değeri kabul edebiliriz
            project.value = await fetchProjectById(toValue(projectId))
        } catch (err) {
            error.value = err
            console.error(`Failed to fetch project ${toValue(projectId)}:`, err)
        } finally {
            loading.value = false
        }
    }

    // Proje ID'si değiştiğinde veriyi yeniden yükle
    // watch(projectId, loadProject, { immediate: true })
    // Şimdilik sadece manuel çağrı için bırakalım

    return {
        project,
        loading,
        error,
        loadProject,
    }
}