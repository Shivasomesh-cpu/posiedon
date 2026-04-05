<template>
  <div class="language-switcher" ref="switcherRef">
    <button class="switcher-trigger" @click="toggleDropdown">
      <span class="lang-icon">🌐</span>
      {{ currentLabel }}
      <span class="caret">{{ open ? '▲' : '▼' }}</span>
    </button>
    <transition name="dropdown">
      <ul v-if="open" class="switcher-dropdown">
        <li
          v-for="loc in availableLocales"
          :key="loc.key"
          class="switcher-option"
          :class="{ active: loc.key === locale }"
          @click="switchLocale(loc.key)"
        >
          <span class="option-check" v-if="loc.key === locale">✓</span>
          {{ loc.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLocales } from '@/i18n/index.js'

const { locale } = useI18n()
const open = ref(false)
const switcherRef = ref(null)

const currentLabel = computed(() => {
  const found = availableLocales.find(l => l.key === locale.value)
  return found ? found.label : locale.value
})

const toggleDropdown = () => {
  open.value = !open.value
}

const switchLocale = (key) => {
  locale.value = key
  localStorage.setItem('locale', key)
  document.documentElement.lang = key
  open.value = false
}

const onClickOutside = (e) => {
  if (switcherRef.value && !switcherRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.documentElement.lang = locale.value
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
  font-family: var(--mf-font-mono);
}

.switcher-trigger {
  background: var(--mf-surface-glass);
  color: var(--mf-text-secondary);
  border: 1px solid var(--mf-border-subtle);
  padding: var(--mf-space-2) var(--mf-space-3);
  font-family: var(--mf-font-mono);
  font-size: var(--mf-text-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--mf-space-2);
  border-radius: var(--mf-radius-md);
  transition: all var(--mf-transition-fast);
}

.switcher-trigger:hover {
  background: var(--mf-surface-glass-hover);
  border-color: var(--mf-border-default);
  color: var(--mf-text-primary);
}

.lang-icon {
  font-size: 1rem;
}

.caret {
  font-size: 0.5rem;
  opacity: 0.6;
}

.switcher-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: var(--mf-bg-elevated);
  border: 1px solid var(--mf-border-default);
  border-radius: var(--mf-radius-md);
  list-style: none;
  padding: var(--mf-space-2);
  min-width: 120px;
  z-index: var(--mf-z-dropdown);
  box-shadow: var(--mf-shadow-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.switcher-option {
  padding: var(--mf-space-2) var(--mf-space-3);
  font-size: var(--mf-text-sm);
  color: var(--mf-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  border-radius: var(--mf-radius-sm);
  transition: all var(--mf-transition-fast);
  display: flex;
  align-items: center;
  gap: var(--mf-space-2);
}

.switcher-option:hover {
  background: var(--mf-surface-glass-hover);
  color: var(--mf-text-primary);
}

.switcher-option.active {
  color: var(--mf-accent-primary);
  background: var(--mf-accent-dim);
}

.option-check {
  color: var(--mf-accent-primary);
  font-size: 0.8rem;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
