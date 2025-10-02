<template>
  <div class="relative text-white p-4 sm:p-6 md:p-8 rounded-xl mb-6 sm:mb-8 overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        src="/dash-header.png"
        alt="Dashboard Header Background"
        class="w-full h-full object-cover"
      >
    </div>

    <!-- Dark Overlay for better text readability on mobile -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 sm:from-black/20 sm:via-black/10 sm:to-black/20" />

    <!-- Content (positioned above background graphics) -->
    <div class="relative z-10">
      <div class="mb-3 sm:mb-4">
        <div class="flex flex-col gap-2">
          <!-- Breadcrumb -->
          <nav class="breadcrumb text-xs sm:text-sm">
            <NuxtLink to="/" class="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <House class="w-3 h-3 sm:w-4 sm:h-4" />
              <span class="hidden sm:inline">HOME</span>
            </NuxtLink>
            <span class="hidden sm:inline">/</span>
            <NuxtLink to="/#katalog-dasbor" class="hover:text-white transition-colors cursor-pointer hidden sm:inline">Katalog Dasbor</NuxtLink>
            <span class="hidden sm:inline">/</span>
            <span class="active hidden sm:inline">Dashboard Progress Implementasi Persuratan PBNU</span>
            <span class="active sm:hidden">Dashboard Persuratan NU</span>
          </nav>
        </div>
      </div>

      <!-- Title and Description -->
      <h1 class="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
        Dashboard Implementasi Persuratan NU
      </h1>
      <p class="text-white text-opacity-90 mb-1 text-sm sm:text-base">
        Monitoring dan evaluasi implementasi sistem persuratan digital di seluruh kepengurusan NU
      </p>
      <p class="text-xs sm:text-sm text-white text-opacity-80">
        Update: {{ formatDate(lastUpdated) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { House } from 'lucide-vue-next'
const lastUpdated = ref(new Date('2024-07-30'))

const formatDate = (date: Date) => {
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

</script>