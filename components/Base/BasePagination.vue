<template>
  <div class="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
    <!-- Per page selector and Results info -->
    <div class="flex items-center gap-2 sm:gap-4">
      <select
        :value="props.perPage"
        class="w-[50px] sm:w-[60px] px-1 sm:px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded bg-white text-gray-900"
        @change="handlePerPageChange(($event.target as HTMLSelectElement).value)"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>

      <div class="text-xs sm:text-sm text-gray-700">
        <!-- Mobile: abbreviated format -->
        <span class="sm:hidden">{{ startItem }}-{{ endItem }} / {{ total }}</span>
        <!-- Desktop: full format -->
        <span class="hidden sm:inline">Showing {{ startItem }}-{{ endItem }} of {{ total }}</span>
      </div>
    </div>
    
    <!-- Pagination controls -->
    <div class="flex items-center gap-2">
      <!-- Previous button -->
      <BaseButton
        variant="secondary"
        size="sm"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >
        ←
      </BaseButton>
      
      <!-- Page numbers -->
      <template v-for="page in visiblePages" :key="page">
        <BaseButton
          v-if="page === '...'"
          variant="ghost"
          size="sm"
          disabled
        >
          ...
        </BaseButton>
        <BaseButton
          v-else
          :variant="page === currentPage ? 'primary' : 'secondary'"
          size="sm"
          @click="typeof page === 'number' ? goToPage(page) : undefined"
        >
          {{ page }}
        </BaseButton>
      </template>
      
      <!-- Next button -->
      <BaseButton
        variant="secondary"
        size="sm"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >
        →
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  total: number
  perPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  perPage: 10
})

const emit = defineEmits<{
  'page-change': [page: number]
  'per-page-change': [perPage: number]
}>()

const startItem = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.total)
})

const visiblePages = computed(() => {
  const delta = 2 // Number of pages to show around current page
  const range = []
  const rangeWithDots = []

  for (let i = Math.max(2, props.currentPage - delta); 
       i <= Math.min(props.totalPages - 1, props.currentPage + delta); 
       i++) {
    range.push(i)
  }

  if (props.currentPage - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (props.currentPage + delta < props.totalPages - 1) {
    rangeWithDots.push('...', props.totalPages)
  } else if (props.totalPages > 1) {
    rangeWithDots.push(props.totalPages)
  }

  return rangeWithDots
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}

const handlePerPageChange = (newPerPage: string) => {
  const perPageNum = parseInt(newPerPage)
  if (!isNaN(perPageNum) && perPageNum > 0) {
    emit('per-page-change', perPageNum)
  }
}
</script>