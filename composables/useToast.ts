import { ref, readonly } from 'vue'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration: number
  persistent?: boolean
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const add = (
    message: string, 
    type: Toast['type'] = 'success', 
    duration = 4000,
    persistent = false
  ) => {
    const id = Math.random().toString(36).substring(2, 15)
    const toast: Toast = {
      id,
      message,
      type,
      duration,
      persistent
    }
    
    toasts.value.push(toast)
    
    if (!persistent) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
    
    return id
  }
  
  const remove = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const clear = () => {
    toasts.value = []
  }
  
  const success = (message: string, duration?: number) => 
    add(message, 'success', duration)
    
  const error = (message: string, duration?: number) => 
    add(message, 'error', duration)
    
  const warning = (message: string, duration?: number) => 
    add(message, 'warning', duration)
    
  const info = (message: string, duration?: number) => 
    add(message, 'info', duration)
  
  return {
    toasts: readonly(toasts),
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info
  }
}