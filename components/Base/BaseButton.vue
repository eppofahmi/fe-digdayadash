<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot v-if="!loading" />
    <div v-else class="flex items-center gap-2">
      <div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"/>
      <span v-if="loadingText">{{ loadingText }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  loadingText: ''
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  // Variant classes
  const variantClasses = {
    primary: 'btn-primary focus:ring-[var(--primary-green)]',
    secondary: 'btn-secondary focus:ring-gray-300',
    ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300'
  }
  
  // Disabled classes
  const disabledClasses = props.disabled || props.loading 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer'
  
  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    disabledClasses
  ].join(' ')
})
</script>