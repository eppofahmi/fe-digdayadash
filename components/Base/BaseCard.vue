<template>
  <div :class="cardClasses">
    <!-- Header if title or subtitle provided -->
    <div v-if="title || subtitle || $slots.header" class="overflow-hidden">
      <slot name="header">
        <div v-if="title || subtitle || $slots.icon" class="p-6 border-b border-gray-200 bg-white flex items-center gap-4">
          <div v-if="$slots.icon" class="section-header-logo">
            <div class="w-6 h-6 text-white">
              <slot name="icon" />
            </div>
          </div>
          <div class="flex-1">
            <h3 v-if="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            <p v-if="subtitle" class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>
          </div>
        </div>
      </slot>
    </div>
    
    <!-- Main content -->
    <div class="p-6">
      <slot />
    </div>
    
    <!-- Footer slot -->
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  hoverable?: boolean
  padding?: boolean
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  hoverable: false,
  padding: true,
  bordered: true
})

const cardClasses = computed(() => {
  const baseClasses = 'card'
  const hoverClasses = props.hoverable ? 'hover:-translate-y-0.5 hover:shadow-lg' : ''
  const borderClasses = props.bordered ? 'border border-gray-200' : 'border-0'
  
  return [baseClasses, hoverClasses, borderClasses].filter(Boolean).join(' ')
})
</script>