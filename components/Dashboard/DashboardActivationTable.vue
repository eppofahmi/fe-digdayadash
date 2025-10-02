<template>
  <BaseCard>
    <!-- Header -->
    <template #header>
      <div class="section-header">
        <div class="section-header-logo">
          <UserCheck class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div class="flex-1">
          <h2 class="text-sm sm:text-base font-semibold mb-1 text-white">Detail Aktivasi Akun per Kepengurusan</h2>
          <p class="text-[11px] sm:text-xs text-white text-opacity-90 leading-tight">
            Detail Aktivasi Akun untuk setiap kepengurusan memastikan bahwa semua anggota dapat mengakses informasi dan layanan yang diperlukan dengan mudah.
          </p>
        </div>
      </div>
    </template>

    <!-- Filters -->
    <DashboardFilters
      :show-status-filter="true"
      @filter-change="handleFilterChange"
      @filter-reset="handleFilterReset"
    />

    <!-- Table -->
    <div class="mx-2 sm:mx-3 mb-3 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <!-- Mobile: Scroll hint -->
      <div class="sm:hidden px-3 py-2 bg-blue-50 border-b border-blue-100">
        <p class="text-xs text-blue-700 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
          Geser ke kiri/kanan untuk melihat semua kolom
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[640px]">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Ranking</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Nama</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Tingkat</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Kepengurusan</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Aktivasi</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedData"
              :key="item.ranking"
              class="hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200">{{ item.ranking }}</td>
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200 whitespace-nowrap">{{ item.nama }}</td>
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200">
                <span
                  :class="getTingkatBadgeClass(item.tingkat)"
                  class="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap"
                >
                  {{ item.tingkat }}
                </span>
              </td>
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200 whitespace-nowrap">{{ item.kepengurusan }}</td>
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200">
                <div class="flex flex-col gap-1 min-w-[100px]">
                  <span
                    class="text-left align-middle text-xs sm:text-sm"
                  >{{ item.aktivasi }}</span>
                  <div class="w-full h-1.5 rounded-full overflow-hidden" style="background: rgba(243, 244, 246, 1);">
                    <div
                      class="h-full rounded-full transition-all duration-300"
                      style="background: rgba(21, 128, 61, 1);"
                      :style="{ width: `${item.percentage}%` }"
                    />
                  </div>
                </div>
              </td>
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200">
                <span :class="getStatusBadgeClass(item.status)">
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <BasePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total="filteredData.length"
        :per-page="perPage"
        @page-change="handlePageChange"
        @per-page-change="handlePerPageChange"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { UserCheck } from 'lucide-vue-next'
import type { OrganizationActivation, FilterOptions } from '~/types'

const currentPage = ref(1)
const perPage = ref(10)

// Mock data - in real app, this would come from store/API
const rawData: OrganizationActivation[] = [
  { ranking: 1, nama: "PBNU", tingkat: "Pusat", kepengurusan: "Pengurus", aktivasi: "47/50", status: "Baik", percentage: 94 },
  { ranking: 2, nama: "LAZISNU", tingkat: "Pusat", kepengurusan: "Lembaga", aktivasi: "45/50", status: "Baik", percentage: 90 },
  { ranking: 3, nama: "LPBINU", tingkat: "Pusat", kepengurusan: "Lembaga", aktivasi: "40/50", status: "Baik", percentage: 80 },
  { ranking: 4, nama: "LPMAARIFNU", tingkat: "Pusat", kepengurusan: "Lembaga", aktivasi: "39/50", status: "Baik", percentage: 78 },
  { ranking: 5, nama: "LAKPESDAMNU", tingkat: "Pusat", kepengurusan: "Lembaga", aktivasi: "44/50", status: "Baik", percentage: 88 },
  { ranking: 6, nama: "LKKNU", tingkat: "Pusat", kepengurusan: "Lembaga", aktivasi: "42/50", status: "Baik", percentage: 84 },
  { ranking: 7, nama: "LWPNU", tingkat: "Pusat", kepengurusan: "Lembaga", aktivasi: "48/50", status: "Baik", percentage: 96 },
  { ranking: 8, nama: "LPNU", tingkat: "Pusat", kepengurusan: "Lembaga", aktivasi: "41/50", status: "Baik", percentage: 82 },
  { ranking: 9, nama: "PWNU Jawa Barat", tingkat: "Wilayah", kepengurusan: "Pengurus", aktivasi: "37/50", status: "Baik", percentage: 74 },
  { ranking: 10, nama: "PWNU Jawa Tengah", tingkat: "Wilayah", kepengurusan: "Pengurus", aktivasi: "46/50", status: "Baik", percentage: 92 }
]

const filters = ref<FilterOptions>({
  kepengurusan: '',
  wilayah: '',
  cabang: '',
  lembaga: '',
  tingkat: '',
  status: ''
})

const filteredData = computed(() => {
  return rawData.filter(item => {
    return (!filters.value.kepengurusan || item.kepengurusan.includes(filters.value.kepengurusan)) &&
           (!filters.value.tingkat || item.tingkat.includes(filters.value.tingkat)) &&
           (!filters.value.status || item.status === filters.value.status)
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / perPage.value)
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredData.value.slice(start, end)
})

const getStatusBadgeClass = (status: string) => {
  const baseClasses = 'inline-block px-3 py-1 rounded-full text-xs font-medium'
  
  switch (status) {
    case 'Baik':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'Sedang':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'Buruk':
      return `${baseClasses} bg-red-100 text-red-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const getTingkatBadgeClass = (tingkat: string) => {
  switch (tingkat) {
    case 'Pusat':
      return 'bg-green-100 text-green-800'
    case 'Wilayah':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const handleFilterChange = (newFilters: FilterOptions) => {
  filters.value = { ...newFilters }
  currentPage.value = 1 // Reset to first page when filters change
}

const handleFilterReset = () => {
  filters.value = {
    kepengurusan: '',
    wilayah: '',
    cabang: '',
    lembaga: '',
    tingkat: '',
    status: ''
  }
  currentPage.value = 1
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handlePerPageChange = (newPerPage: number) => {
  perPage.value = newPerPage
  currentPage.value = 1
}
</script>