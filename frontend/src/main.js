import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { sanitizeDirective } from './directives/sanitize'
import { MotionPlugin } from '@vueuse/motion'



const app = createApp(App)

// Global direktifleri kaydet
app.directive('sanitize', sanitizeDirective)

app.use(router)
app.use(MotionPlugin)

app.mount('#app')