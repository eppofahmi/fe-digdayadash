<template>
  <div
    class="animate-pulse"
    :class="containerClass"
  >
    <div
      :class="skeletonClass"
      :style="skeletonStyle"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  variant: 'rectangular',
  className: ''
})

const containerClass = computed(() => props.className)

const skeletonClass = computed(() => {
  const baseClasses = 'bg-gray-200'

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  }

  return [baseClasses, variantClasses[props.variant]].join(' ')
})

const skeletonStyle = computed(() => ({
  width: props.width,
  height: props.height
}))
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
