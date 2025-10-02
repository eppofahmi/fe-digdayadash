<template>
  <div class="space-y-4">
    <!-- Chart area -->
    <div class="relative bg-gray-50 rounded-lg overflow-hidden" :style="{ height }">
      <div class="absolute inset-0 flex items-end justify-around p-4 gap-2">
        <!-- Animated bars -->
        <div
          v-for="i in 11"
          :key="i"
          class="bg-gray-200 rounded-t animate-pulse"
          :style="{
            width: '100%',
            height: `${Math.random() * 60 + 40}%`,
            animationDelay: `${i * 0.1}s`
          }"
        />
      </div>
    </div>

    <!-- Statistics summary skeleton -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
      <div
        v-for="i in 4"
        :key="i"
        class="text-center p-2 sm:p-4 bg-gray-50 rounded-lg"
      >
        <BaseSkeleton width="60%" height="0.625rem" class="mx-auto mb-2" />
        <BaseSkeleton width="80px" height="1.5rem" class="mx-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  height?: string
}

withDefaults(defineProps<Props>(), {
  height: '384px' // 96 * 4 = default h-96
})
</script>
