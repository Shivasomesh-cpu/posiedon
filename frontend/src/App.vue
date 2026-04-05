<template>
  <div id="app-root" :data-theme="theme">
    <!-- Animated Background -->
    <div class="app-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="grid-pattern"></div>
    </div>
    
    <!-- Particles -->
    <div class="particles-container">
      <div v-for="n in 20" :key="n" class="particle"></div>
    </div>
    
    <!-- Main Content -->
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <!-- Toast Container -->
    <div class="toast-container">
      <transition-group name="toast">
        <div 
          v-for="toast in toasts" 
          :key="toast.id" 
          class="toast"
          :class="toast.type"
        >
          <span class="toast-icon">{{ getToastIcon(toast.type) }}</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'

// Theme Management
const theme = ref(localStorage.getItem('mf-theme') || 'dark')

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('mf-theme', theme.value)
}

provide('theme', { theme, toggleTheme })

// Toast Notifications
const toasts = ref([])
let toastId = 0

const showToast = (message, type = 'info', duration = 4000) => {
  const id = ++toastId
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, duration)
}

const getToastIcon = (type) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }
  return icons[type] || icons.info
}

provide('toast', showToast)

// Initialize theme on mount
onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>

<style>
/* Import Design System */
@import './assets/design-system.css';

/* App Root */
#app-root {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* Animated Background */
.app-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: var(--mf-bg-primary);
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: orb-float 20s ease-in-out infinite;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
  top: -200px;
  left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%);
  top: 50%;
  right: -150px;
  animation-delay: -7s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%);
  bottom: -100px;
  left: 30%;
  animation-delay: -14s;
}

@keyframes orb-float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(-30px, -20px) scale(1.02);
  }
}

/* Grid Pattern Overlay */
.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
}

/* Particles */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--mf-accent-primary);
  border-radius: 50%;
  opacity: 0;
  animation: particle-rise 15s infinite ease-out;
}

@keyframes particle-rise {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-10vh) scale(1);
    opacity: 0;
  }
}

.particle:nth-child(1) { left: 5%; animation-delay: 0s; }
.particle:nth-child(2) { left: 10%; animation-delay: 1s; }
.particle:nth-child(3) { left: 15%; animation-delay: 2s; }
.particle:nth-child(4) { left: 20%; animation-delay: 0.5s; }
.particle:nth-child(5) { left: 25%; animation-delay: 1.5s; }
.particle:nth-child(6) { left: 30%; animation-delay: 2.5s; }
.particle:nth-child(7) { left: 35%; animation-delay: 0.3s; }
.particle:nth-child(8) { left: 40%; animation-delay: 1.3s; }
.particle:nth-child(9) { left: 45%; animation-delay: 2.3s; }
.particle:nth-child(10) { left: 50%; animation-delay: 0.8s; }
.particle:nth-child(11) { left: 55%; animation-delay: 1.8s; }
.particle:nth-child(12) { left: 60%; animation-delay: 2.8s; }
.particle:nth-child(13) { left: 65%; animation-delay: 0.2s; }
.particle:nth-child(14) { left: 70%; animation-delay: 1.2s; }
.particle:nth-child(15) { left: 75%; animation-delay: 2.2s; }
.particle:nth-child(16) { left: 80%; animation-delay: 0.7s; }
.particle:nth-child(17) { left: 85%; animation-delay: 1.7s; }
.particle:nth-child(18) { left: 90%; animation-delay: 2.7s; }
.particle:nth-child(19) { left: 95%; animation-delay: 0.4s; }
.particle:nth-child(20) { left: 98%; animation-delay: 1.4s; }

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: var(--mf-bg-elevated);
  border: 1px solid var(--mf-border-default);
  border-radius: var(--mf-radius-lg);
  box-shadow: var(--mf-shadow-lg);
  backdrop-filter: blur(12px);
  min-width: 280px;
  max-width: 400px;
}

.toast-icon {
  font-size: 16px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.toast.success .toast-icon {
  background: rgba(16, 185, 129, 0.2);
  color: var(--mf-green);
}

.toast.error .toast-icon {
  background: rgba(239, 68, 68, 0.2);
  color: var(--mf-red);
}

.toast.warning .toast-icon {
  background: rgba(234, 179, 8, 0.2);
  color: var(--mf-yellow);
}

.toast.info .toast-icon {
  background: var(--mf-accent-dim);
  color: var(--mf-accent-secondary);
}

.toast-message {
  font-size: var(--mf-text-sm);
  color: var(--mf-text-primary);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Global Styles */
#app {
  font-family: var(--mf-font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  font-family: inherit;
}

/* Light theme background adjustments */
[data-theme="light"] .app-background {
  background: var(--mf-bg-primary);
}

[data-theme="light"] .gradient-orb {
  opacity: 0.3;
}

[data-theme="light"] .particle {
  background: var(--mf-accent-primary);
}
</style>
