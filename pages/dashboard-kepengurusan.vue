<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center max-w-md mx-auto p-8">
      <!-- Icon -->
      <div class="w-24 h-24 mx-auto mb-6 bg-[var(--primary-green)] rounded-full flex items-center justify-center">
        <Users class="w-12 h-12 text-white" />
      </div>

      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        Dashboard Profil Kepengurusan NU
      </h1>

      <!-- Message -->
      <p class="text-lg text-gray-600 mb-2">
        Kami sedang menyiapkan sesuatu yang istimewa
      </p>
      <p class="text-gray-500 mb-8">
        Terima kasih sudah berkunjung, segera kembali lagi!
      </p>

      <!-- Back Button -->
      <BaseButton variant="primary" @click="navigateTo('/')">
        Kembali ke Beranda
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Users } from 'lucide-vue-next'

// Page metadata
useHead({
  title: 'Dashboard Profil Kepengurusan NU - Coming Soon',
  meta: [
    {
      name: 'description',
      content: 'Dashboard Profil Kepengurusan NU akan segera hadir'
    }
  ]
})
</script>