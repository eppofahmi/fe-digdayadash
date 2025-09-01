<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click.self="closeModal"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        :class="{ 'opacity-100': modelValue, 'opacity-0': !modelValue }"
      />
      
      <!-- Modal -->
      <div
        class="relative bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 transform transition-all"
        :class="{ 'scale-100 opacity-100': modelValue, 'scale-95 opacity-0': !modelValue }"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 class="text-base font-semibold text-gray-900">
            <slot name="title">Modal</slot>
          </h3>
          <button
            class="text-gray-400 hover:text-gray-600 transition-colors"
            @click="closeModal"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
        
        <!-- Content -->
        <div class="p-4">
          <slot />
        </div>
        
        <!-- Footer -->
        <div v-if="$slots.footer" class="px-4 py-3 border-t border-gray-100">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  closeOnOutside?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnOutside: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const closeModal = () => {
  if (props.closeOnOutside) {
    emit('update:modelValue', false)
  }
}
</script>