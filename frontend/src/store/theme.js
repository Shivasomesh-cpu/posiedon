/**
 * Theme Store - Manages application theme state
 */
import { reactive, readonly, watchEffect } from 'vue'

const state = reactive({
  theme: localStorage.getItem('mf-theme') || 'dark',
  systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
})

// Watch for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  state.systemPreference = e.matches ? 'dark' : 'light'
})

// Apply theme to document
watchEffect(() => {
  document.documentElement.setAttribute('data-theme', state.theme)
  localStorage.setItem('mf-theme', state.theme)
})

export function useTheme() {
  const toggleTheme = () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark'
  }
  
  const setTheme = (theme) => {
    if (theme === 'dark' || theme === 'light') {
      state.theme = theme
    }
  }
  
  const useSystemTheme = () => {
    state.theme = state.systemPreference
  }
  
  return {
    theme: readonly(state).theme,
    systemPreference: readonly(state).systemPreference,
    toggleTheme,
    setTheme,
    useSystemTheme
  }
}

export default {
  theme: state.theme,
  toggleTheme: () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark'
  }
}
