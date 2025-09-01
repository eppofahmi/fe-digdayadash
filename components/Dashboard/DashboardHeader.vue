<template>
  <div class="text-white p-8 rounded-xl mb-8" style="background: linear-gradient(to bottom right, #00491E, #1E9A3F)">
    <div class="mb-4">
      <div class="flex flex-col gap-2">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <span class="flex items-center gap-1">
            <House class="w-4 h-4" />
            HOME
          </span>
          <span>/</span>
          <span>Katalog Dasbor</span>
          <span>/</span>
          <span class="active">Dashboard Progress Implementasi Persuratan PBNU</span>
        </nav>
      </div>
    </div>
    
    <!-- Title and Description -->
    <h1 class="text-3xl font-bold mb-2">
      Dashboard Implementasi Persuratan NU
    </h1>
    <p class="text-white text-opacity-90 mb-1">
      Monitoring dan evaluasi implementasi sistem persuratan digital di seluruh kepengurusan NU
    </p>
    <p class="text-sm text-white text-opacity-80">
      Update: {{ formatDate(lastUpdated) }}
    </p>
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