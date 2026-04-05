/**
 * Toast Notifications Store
 * Provides global toast notification functionality
 */
import { reactive, readonly } from 'vue'

const state = reactive({
  toasts: [],
  nextId: 1
})

const DEFAULT_DURATION = 4000

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - Type of toast: 'info' | 'success' | 'warning' | 'error'
 * @param {number} duration - Duration in milliseconds
 * @returns {number} Toast ID for manual dismissal
 */
export function showToast(message, type = 'info', duration = DEFAULT_DURATION) {
  const id = state.nextId++
  
  state.toasts.push({
    id,
    message,
    type,
    timestamp: Date.now()
  })
  
  // Auto-dismiss after duration
  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id)
    }, duration)
  }
  
  return id
}

/**
 * Dismiss a specific toast
 * @param {number} id - Toast ID to dismiss
 */
export function dismissToast(id) {
  const index = state.toasts.findIndex(t => t.id === id)
  if (index !== -1) {
    state.toasts.splice(index, 1)
  }
}

/**
 * Dismiss all toasts
 */
export function dismissAllToasts() {
  state.toasts.length = 0
}

/**
 * Convenience methods for different toast types
 */
export const toast = {
  info: (message, duration) => showToast(message, 'info', duration),
  success: (message, duration) => showToast(message, 'success', duration),
  warning: (message, duration) => showToast(message, 'warning', duration),
  error: (message, duration) => showToast(message, 'error', duration),
  dismiss: dismissToast,
  dismissAll: dismissAllToasts
}

/**
 * Composable for using toasts in components
 */
export function useToast() {
  return {
    toasts: readonly(state.toasts),
    show: showToast,
    dismiss: dismissToast,
    dismissAll: dismissAllToasts,
    info: toast.info,
    success: toast.success,
    warning: toast.warning,
    error: toast.error
  }
}

export default toast
