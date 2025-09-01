<template>
  <div class="max-w-6xl mx-auto px-5">
    <!-- Dashboard Header -->
    <DashboardHeader />
    
    <!-- Statistics Cards -->
    <DashboardStats />
    
    <!-- Activation Table -->
    <div class="mb-8">
      <DashboardActivationTable />
    </div>
    
    <!-- Statistics Table -->
    <div class="mb-8">
      <DashboardStatisticsTable />
    </div>
    
    <!-- Trend Chart -->
    <div class="mb-8">
      <DashboardTrendChart />
    </div>
  </div>
</template>

<script setup lang="ts">
// Use default layout

// Protect this route with authentication
definePageMeta({
  middleware: 'auth'
})

// Page metadata
useHead({
  title: 'Dashboard Implementasi Persuratan NU',
  meta: [
    { 
      name: 'description', 
      content: 'Monitoring dan evaluasi implementasi sistem persuratan digital di seluruh kepengurusan NU' 
    }
  ]
})
</script>