<template>
  <div class="relative">
    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :class="selectClasses"
      style="background: white !important; color: black !important;"
      @input="updateValue"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="getOptionValue(option)"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>
    
    <!-- Custom arrow icon -->
    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string | number
}

interface Props {
  id?: string
  modelValue: string | number | undefined
  options: Option[] | string[]
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const selectClasses = computed(() => {
  const baseClasses = 'block w-full pl-3 pr-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-[var(--primary-green)] transition-colors duration-200 appearance-none'
  const enabledClasses = 'border-gray-300 !bg-white !text-gray-900'
  const disabledClasses = 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
  
  return [
    baseClasses,
    props.disabled ? disabledClasses : enabledClasses
  ].join(' ')
})

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}

const getOptionValue = (option: Option | string): string | number => {
  return typeof option === 'string' ? option : option.value
}

const getOptionLabel = (option: Option | string): string => {
  return typeof option === 'string' ? option : option.label
}
</script>