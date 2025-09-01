<template>
  <footer class="bg-[var(--footer-gray)] text-white py-8 mt-4">
    <div class="max-w-6xl mx-auto px-5">
      <div class="flex items-center justify-between">
        <!-- Footer Logo/Text -->
        <div class="flex items-center gap-2 font-bold text-lg">
          DIGDAYA, 2025
        </div>
        
        <!-- Footer Links -->
        <div class="flex gap-6">
          <NuxtLink 
            to="/katalog-data"
            class="text-gray-400 no-underline text-sm hover:text-white transition-colors duration-200"
          >
            Katalog Data
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component is purely presentational
</script>