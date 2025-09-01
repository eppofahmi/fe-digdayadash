<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <LayoutHeader />
    
    <!-- Main Content -->
    <main class="flex-1 py-6">
      <slot />
    </main>
    
    <!-- Footer -->
    <LayoutFooter />
    
    <!-- Global Toast Notifications -->
    <BaseToast />
  </div>
</template>

<script setup lang="ts">
// Default layout - wraps all pages
</script>