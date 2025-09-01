<template>
  <div class="max-w-6xl mx-auto px-5 py-16">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Tutorial</h1>
      <p class="text-xl text-gray-600 mb-8">Halaman tutorial sedang dalam pengembangan</p>
      <NuxtLink 
        to="/" 
        class="inline-flex items-center px-6 py-3 bg-[var(--primary-green)] text-white rounded-lg hover:bg-[var(--primary-green-hover)] transition-colors"
      >
        ← Kembali ke Dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Tutorial - Dashboard Implementasi Persuratan NU'
})
</script>