<template>
  <div class="px-6 pb-4 pt-2 bg-white border-b border-gray-200 flex items-center justify-end gap-4">
    <!-- Filter Group -->
    <div class="flex items-center gap-3">
      <span class="font-medium text-gray-700 text-sm">Filter</span>
      
      <BaseSelect
        v-model="filters.kepengurusan"
        :options="kepengurusanOptions"
        placeholder="Kepengurusan"
        class="w-[110px]"
      />
      
      <BaseSelect
        v-model="filters.wilayah"
        :options="wilayahOptions"
        placeholder="Wilayah"
        class="w-[100px]"
      />
      
      <BaseSelect
        v-model="filters.cabang"
        :options="cabangOptions"
        placeholder="Cabang"
        class="w-[100px]"
      />
      
      <BaseSelect
        v-model="filters.lembaga"
        :options="lembagaOptions"
        placeholder="Lembaga"
        class="w-[110px]"
      />
      
      <BaseSelect
        v-if="showStatusFilter"
        v-model="filters.status"
        :options="statusOptions"
        placeholder="Status"
        class="w-[90px]"
      />
    </div>
    
    <!-- Action Buttons -->
    <div class="flex gap-2">
      <BaseButton variant="primary" size="sm" @click="applyFilters">
        Terapkan
      </BaseButton>
      <BaseButton variant="secondary" size="sm" @click="resetFilters">
        Reset
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FilterOptions } from '~/types'

interface Props {
  showStatusFilter?: boolean
}

withDefaults(defineProps<Props>(), {
  showStatusFilter: false
})

const emit = defineEmits<{
  'filter-change': [filters: FilterOptions]
  'filter-reset': []
}>()

const filters = ref<FilterOptions>({
  kepengurusan: '',
  wilayah: '',
  cabang: '',
  lembaga: '',
  tingkat: '',
  status: ''
})

// Mock options - in real app, these would come from API
const kepengurusanOptions = [
  'PBNU',
  'PWNU',
  'PCNU',
  'PRNU'
]

const wilayahOptions = [
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'DKI Jakarta'
]

const cabangOptions = [
  'Jakarta Pusat',
  'Jakarta Selatan',
  'Bandung',
  'Semarang'
]

const lembagaOptions = [
  'LAZISNU',
  'LPBINU',
  'LPMAARIFNU',
  'LAKPESDAMNU'
]

const statusOptions = [
  { label: 'Baik', value: 'Baik' },
  { label: 'Sedang', value: 'Sedang' },
  { label: 'Buruk', value: 'Buruk' }
]

const applyFilters = () => {
  emit('filter-change', { ...filters.value })
}

const resetFilters = () => {
  filters.value = {
    kepengurusan: '',
    wilayah: '',
    cabang: '',
    lembaga: '',
    tingkat: '',
    status: ''
  }
  emit('filter-reset')
}

// Watch for filter changes
watch(filters, (_newFilters) => {
  // Auto-apply filters on change (optional)
  // emit('filter-change', { ...newFilters })
}, { deep: true })
</script>