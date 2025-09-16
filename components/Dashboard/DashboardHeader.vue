<template>
  <div class="relative text-white p-8 rounded-xl mb-8 overflow-hidden" style="background: linear-gradient(to bottom right, #32A651, #067936)">
    <!-- Left supergraphic -->
    <div class="absolute left-0 top-0 w-64 h-full opacity-30 pointer-events-none">
      <img 
        src="/supergraphic-left.svg" 
        alt="" 
        class="h-full w-full object-contain object-left"
      >
    </div>
    
    <!-- Right supergraphic -->
    <div class="absolute right-0 top-0 w-96 h-full opacity-30 pointer-events-none">
      <img 
        src="/supergraphic-right.svg" 
        alt="" 
        class="h-full w-full object-contain object-right"
      >
    </div>
    
    <!-- Content (positioned above background graphics) -->
    <div class="relative z-10">
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