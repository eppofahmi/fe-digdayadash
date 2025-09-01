<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <TransitionGroup
        name="toast"
        tag="div"
        class="space-y-2"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="toastClasses(toast.type)"
          class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border max-w-md"
        >
          <!-- Icon -->
          <component :is="getIcon(toast.type)" :class="iconClasses(toast.type)" class="w-5 h-5 flex-shrink-0" />
          
          <!-- Message -->
          <p class="text-sm font-medium flex-1">{{ toast.message }}</p>
          
          <!-- Close Button -->
          <button
            @click="remove(toast.id)"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

const { toasts, remove } = useToast()

const toastClasses = (type: string) => {
  const baseClasses = "bg-white/90"
  
  switch (type) {
    case 'success':
      return `${baseClasses} border-green-200 text-green-800`
    case 'error':
      return `${baseClasses} border-red-200 text-red-800`
    case 'warning':
      return `${baseClasses} border-amber-200 text-amber-800`
    case 'info':
      return `${baseClasses} border-blue-200 text-blue-800`
    default:
      return `${baseClasses} border-gray-200 text-gray-800`
  }
}

const iconClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-500'
    case 'error':
      return 'text-red-500'
    case 'warning':
      return 'text-amber-500'
    case 'info':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    default:
      return Info
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>