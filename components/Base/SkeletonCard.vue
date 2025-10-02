<template>
  <BaseCard :padding="false" class="text-center">
    <div class="p-2 sm:p-3">
      <!-- Icon skeleton -->
      <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-1 animate-pulse" />

      <!-- Label skeleton -->
      <div class="mb-1 space-y-1">
        <BaseSkeleton width="70%" height="0.625rem" class="mx-auto" />
        <BaseSkeleton width="50%" height="0.625rem" class="mx-auto" />
      </div>

      <!-- Divider -->
      <div class="w-full h-px bg-gray-200 mb-1 sm:mb-2" />

      <!-- Value skeleton -->
      <div class="flex items-center justify-center gap-2">
        <BaseSkeleton width="60px" height="1.75rem" />
        <BaseSkeleton width="40px" height="1rem" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
// Skeleton loader for statistics cards
</script>
