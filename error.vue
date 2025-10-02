<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon -->
      <div class="mb-6">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle class="w-10 h-10 text-red-600" />
        </div>
      </div>

      <!-- Error Message -->
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        {{ is404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan' }}
      </h1>

      <p class="text-gray-600 mb-6">
        {{ errorMessage }}
      </p>

      <!-- Error Details (Development Only) -->
      <div v-if="isDevelopment && error.stack" class="mb-6 p-4 bg-gray-100 rounded-lg text-left">
        <p class="text-xs font-mono text-gray-700 overflow-auto max-h-40">
          {{ error.stack }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <BaseButton
          variant="primary"
          @click="handleError"
        >
          {{ is404 ? 'Kembali ke Beranda' : 'Coba Lagi' }}
        </BaseButton>

        <BaseButton
          v-if="!is404"
          variant="secondary"
          @click="goHome"
        >
          Kembali ke Beranda
        </BaseButton>
      </div>

      <!-- Support Link -->
      <p class="mt-6 text-sm text-gray-500">
        Jika masalah berlanjut, silakan hubungi
        <a href="mailto:support@pbnu.org" class="text-[var(--primary-green)] hover:underline">
          tim support
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'

interface Props {
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
    stack?: string
  }
}

const props = defineProps<Props>()

const isDevelopment = import.meta.dev

const is404 = computed(() => props.error.statusCode === 404)

const errorMessage = computed(() => {
  if (is404.value) {
    return 'Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.'
  }

  if (props.error.statusMessage) {
    return props.error.statusMessage
  }

  if (props.error.message) {
    return props.error.message
  }

  return 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.'
})

const handleError = () => {
  if (is404.value) {
    goHome()
  } else {
    clearError({ redirect: '/' })
  }
}

const goHome = () => {
  clearError({ redirect: '/' })
}
</script>
