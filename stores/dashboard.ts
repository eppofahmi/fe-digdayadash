import { defineStore } from 'pinia'
import type { 
  StatisticCard, 
  OrganizationActivation, 
  OrganizationStatistics,
  ChartData,
  FilterOptions 
} from '~/types'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Statistics data
  const statistics = ref<StatisticCard[]>([
    {
      icon: '👥',
      label: 'Total Kepengurusan',
      value: '10,621',
      description: 'pengurus terhubung'
    },
    {
      icon: '✅',
      label: 'Pengurus Terhubung',
      value: '152/184',
      description: '50%'
    },
    {
      icon: '📤',
      label: 'Surat Terkirim',
      value: '12,450',
      description: 'surat terkirim'
    },
    {
      icon: '📥',
      label: 'Surat Masuk',
      value: '9,156',
      description: 'surat masuk'
    },
    {
      icon: '📋',
      label: 'Log Disposisi',
      value: '8,245',
      description: 'log disposisi'
    },
    {
      icon: '📝',
      label: 'Memo',
      value: '3,245',
      description: 'memo'
    }
  ])
  
  // Activation data
  const activationData = ref<OrganizationActivation[]>([
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
  ])
  
  // Statistics table data
  const organizationStats = ref<OrganizationStatistics[]>([
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
  ])
  
  // Chart data
  const trendChartData = ref<ChartData>({
    labels: ['20 Jun', '21 Jun', '22 Jun', '23 Jun', '24 Jun', '25 Jun', '26 Jun', '27 Jun', '28 Jun', '29 Jun', '30 Jun'],
    data: [150, 200, 180, 220, 250, 300, 280, 350, 320, 400, 450]
  })
  
  // Actions
  const fetchStatistics = async () => {
    loading.value = true
    error.value = null
    
    try {
      // In real app, make API call here
      // const response = await $fetch('/api/dashboard/statistics')
      // statistics.value = response.data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (err) {
      error.value = 'Failed to fetch statistics'
      console.error('Error fetching statistics:', err)
    } finally {
      loading.value = false
    }
  }
  
  const fetchActivationData = async (filters?: FilterOptions) => {
    loading.value = true
    error.value = null
    
    try {
      // In real app, make API call with filters
      // const response = await $fetch('/api/dashboard/activation', { 
      //   query: filters 
      // })
      // activationData.value = response.data
      
      // Simulate filtering (in real app, this would be done server-side)
      if (filters) {
        // Apply filters to activationData
        console.log('Applying filters:', filters)
      }
      
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (err) {
      error.value = 'Failed to fetch activation data'
      console.error('Error fetching activation data:', err)
    } finally {
      loading.value = false
    }
  }
  
  const fetchOrganizationStats = async (_filters?: FilterOptions) => {
    loading.value = true
    error.value = null
    
    try {
      // In real app, make API call with filters
      // const response = await $fetch('/api/dashboard/organization-stats', { 
      //   query: filters 
      // })
      // organizationStats.value = response.data
      
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (err) {
      error.value = 'Failed to fetch organization statistics'
      console.error('Error fetching organization statistics:', err)
    } finally {
      loading.value = false
    }
  }
  
  const fetchTrendData = async (timeRange: string, _dateFrom?: string, _dateTo?: string) => {
    loading.value = true
    error.value = null
    
    try {
      // In real app, make API call with time range and date filters
      // const response = await $fetch('/api/dashboard/trend', { 
      //   query: { timeRange, dateFrom, dateTo }
      // })
      // trendChartData.value = response.data
      
      // Simulate different data based on time range for ECharts
      switch (timeRange) {
        case 'weekly':
          trendChartData.value = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [1200, 1500, 1300, 1800]
          }
          break
        case 'monthly':
          trendChartData.value = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [5000, 5500, 5200, 6000, 5800, 6200]
          }
          break
        default:
          trendChartData.value = {
            labels: ['20 Jun', '21 Jun', '22 Jun', '23 Jun', '24 Jun', '25 Jun', '26 Jun', '27 Jun', '28 Jun', '29 Jun', '30 Jun'],
            data: [150, 200, 180, 220, 250, 300, 280, 350, 320, 400, 450]
          }
          break
      }
      
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (err) {
      error.value = 'Failed to fetch trend data'
      console.error('Error fetching trend data:', err)
    } finally {
      loading.value = false
    }
  }
  
  const resetError = () => {
    error.value = null
  }
  
  // Getters (computed)
  const totalOrganizations = computed(() => 
    statistics.value.find(s => s.label === 'Total Kepengurusan')?.value || '0'
  )
  
  const activationRate = computed(() => 
    statistics.value.find(s => s.label === 'Pengurus Terhubung')?.description || '0%'
  )
  
  return {
    // State
    loading: readonly(loading),
    error: readonly(error),
    statistics: readonly(statistics),
    activationData: readonly(activationData),
    organizationStats: readonly(organizationStats),
    trendChartData: readonly(trendChartData),
    
    // Actions
    fetchStatistics,
    fetchActivationData,
    fetchOrganizationStats,
    fetchTrendData,
    resetError,
    
    // Getters
    totalOrganizations,
    activationRate
  }
})