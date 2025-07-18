import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/projects',
            name: 'projects',
            component: () =>
                import ('../views/ProjectsView.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () =>
                import ('../views/ContactView.vue')
        },
        {
            path: '/projects/:id',
            name: 'project-detail',
            component: () =>
                import ('../views/ProjectDetail.vue')
        },

    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: 'smooth' }
        }
    }
})

export default router