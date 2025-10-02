<template>
  <BaseCard>
    <!-- Header -->
    <template #header>
      <div class="section-header">
        <div class="section-header-logo">
          <ChartColumnBig class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div class="flex-1">
          <div class="flex items-start gap-2">
            <h2 class="text-sm sm:text-base font-semibold text-white flex-1">
              Dashboard Statistik Surat per Kepengurusan
            </h2>
            <!-- Info icon - Mobile only -->
            <button
              class="sm:hidden flex-shrink-0 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              @click="showDescription = !showDescription"
            >
              <Info class="w-3 h-3 text-white" />
            </button>
          </div>

          <!-- Mobile: Collapsible description -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-20"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-20"
            leave-to-class="opacity-0 max-h-0"
          >
            <p v-show="showDescription" class="sm:hidden text-[11px] text-white text-opacity-90 leading-tight mt-1 overflow-hidden">
              Dashboard Statistik Surat per Kepengurusan memberikan gambaran tentang pengelolaan surat.
            </p>
          </Transition>

          <!-- Desktop: Always visible description -->
          <p class="hidden sm:block text-xs text-white text-opacity-90 leading-tight mt-1">
            Dashboard Statistik Surat per Kepengurusan memberikan gambaran tentang pengelolaan surat.
          </p>
        </div>
      </div>
    </template>

    <!-- Filters -->
    <DashboardFilters
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
        <table class="w-full min-w-[800px]">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">No</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Nama</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Tingkat</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Kepengurusan</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap">Tanggal Mulai</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap">Surat Keluar</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap">Surat Masuk</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap">Log Disposisi</th>
              <th class="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200">Memo</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedData"
              :key="item.no"
              class="hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200">{{ item.no }}</td>
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
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200 whitespace-nowrap">{{ item.tanggalMulai }}</td>
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200">{{ formatNumber(item.suratKeluar) }}</td>
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200">{{ formatNumber(item.suratMasuk) }}</td>
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200">{{ formatNumber(item.logDisposisi) }}</td>
              <td class="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-b border-gray-200">{{ formatNumber(item.memo) }}</td>
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
import { ChartColumnBig, Info } from 'lucide-vue-next'
import type { OrganizationStatistics, FilterOptions } from '~/types'

const currentPage = ref(1)
const perPage = ref(10)
const showDescription = ref(false)

// Mock data - in real app, this would come from store/API
const rawData: OrganizationStatistics[] = [
  { no: 1, nama: "PBNU", tingkat: "Pusat", kepengurusan: "Pengurus", tanggalMulai: "30 Jun 2025", suratKeluar: 1400, suratMasuk: 1220, logDisposisi: 1365, memo: 1310 },
  { no: 2, nama: "LAZISNU", tingkat: "Pusat", kepengurusan: "Lembaga", tanggalMulai: "30 Jun 2025", suratKeluar: 1480, suratMasuk: 1150, logDisposisi: 1415, memo: 1490 },
  { no: 3, nama: "LPBINU", tingkat: "Pusat", kepengurusan: "Lembaga", tanggalMulai: "30 Jun 2025", suratKeluar: 1500, suratMasuk: 1260, logDisposisi: 1500, memo: 1340 },
  { no: 4, nama: "LPMAARIFNU", tingkat: "Pusat", kepengurusan: "Lembaga", tanggalMulai: "30 Jun 2025", suratKeluar: 1600, suratMasuk: 1310, logDisposisi: 1425, memo: 1610 },
  { no: 5, nama: "LAKPESDAMNU", tingkat: "Pusat", kepengurusan: "Lembaga", tanggalMulai: "30 Jun 2025", suratKeluar: 1350, suratMasuk: 1340, logDisposisi: 1480, memo: 1675 },
  { no: 6, nama: "LKKNU", tingkat: "Pusat", kepengurusan: "Lembaga", tanggalMulai: "30 Jun 2025", suratKeluar: 1225, suratMasuk: 1430, logDisposisi: 1320, memo: 1410 },
  { no: 7, nama: "LWPNU", tingkat: "Pusat", kepengurusan: "Lembaga", tanggalMulai: "30 Jun 2025", suratKeluar: 1390, suratMasuk: 1375, logDisposisi: 1230, memo: 1210 },
  { no: 8, nama: "LPNU", tingkat: "Pusat", kepengurusan: "Lembaga", tanggalMulai: "30 Jun 2025", suratKeluar: 1410, suratMasuk: 1505, logDisposisi: 1400, memo: 1300 },
  { no: 9, nama: "PWNU Jawa Barat", tingkat: "Wilayah", kepengurusan: "Pengurus", tanggalMulai: "30 Jun 2025", suratKeluar: 1470, suratMasuk: 1295, logDisposisi: 1555, memo: 1255 },
  { no: 10, nama: "PWNU Jawa Tengah", tingkat: "Wilayah", kepengurusan: "Pengurus", tanggalMulai: "30 Jun 2025", suratKeluar: 1275, suratMasuk: 1285, logDisposisi: 1600, memo: 1370 }
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
           (!filters.value.tingkat || item.tingkat.includes(filters.value.tingkat))
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

const formatNumber = (num: number) => {
  return num.toLocaleString('id-ID')
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
  currentPage.value = 1
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