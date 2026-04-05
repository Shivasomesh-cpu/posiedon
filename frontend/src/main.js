import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { useTheme } from './store/theme'
import { useToast } from './store/toast'

// Import design system
import './assets/design-system.css'

const app = createApp(App)

// Initialize theme
const { theme, toggleTheme } = useTheme()

// Initialize toast
const toast = useToast()

// Provide global utilities
app.provide('theme', { theme, toggleTheme })
app.provide('toast', toast.show)

app.use(router)
app.use(i18n)

app.mount('#app')
