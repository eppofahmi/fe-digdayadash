<template>
  <BaseCard>
    <!-- Header -->
    <template #header>
      <div class="section-header">
        <div class="section-header-logo">
          <ChartSpline class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <h2 class="text-base font-semibold mb-1 text-white">Tren Surat Keluar</h2>
          <p class="text-xs text-white text-opacity-90 leading-tight">
            Dashboard Statistik Surat per Kepengurusan memberikan gambaran tentang pengelolaan surat.
          </p>
        </div>
      </div>
    </template>
    
    <!-- Time Filter -->
    <div class="px-6 py-5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
      <!-- Time Options -->
      <div class="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200">
        <button
          v-for="option in timeOptions"
          :key="option.value"
          :class="getTimeButtonClass(option.value)"
          @click="selectedTimeRange = option.value"
        >
          {{ option.label }}
        </button>
      </div>
      
      <!-- Date Range -->
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-700">Dari</span>
        <input
          v-model="dateFrom"
          type="date"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-[var(--primary-green)]"
          @change="updateChart"
        >
        <span class="text-sm text-gray-700">Sampai</span>
        <input
          v-model="dateTo"
          type="date"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-[var(--primary-green)]"
          @change="updateChart"
        >
      </div>
    </div>
    
    <!-- Chart Container -->
    <div class="p-8 h-96">
      <BaseEChart 
        :option="chartOption" 
        height="100%" 
        :loading="loading"
        @chart-ready="onChartReady"
      />
    </div>
    
    <!-- Statistics Summary -->
    <div class="px-6 py-5 bg-gray-50 border-t border-gray-200 grid grid-cols-4 gap-4">
      <div class="text-center">
        <div class="text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Total</div>
        <div class="text-2xl font-bold text-gray-900">{{ chartStats.total }}</div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Rata Rata</div>
        <div class="text-2xl font-bold text-gray-900">{{ chartStats.average }}</div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Tertinggi</div>
        <div class="text-2xl font-bold text-gray-900">{{ chartStats.highest }}</div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Terendah</div>
        <div class="text-2xl font-bold text-gray-900">{{ chartStats.lowest }}</div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ChartSpline } from 'lucide-vue-next'
import type { ECharts, EChartsOption } from 'echarts'

interface TimeOption {
  label: string
  value: 'daily' | 'weekly' | 'monthly'
}

const selectedTimeRange = ref<'daily' | 'weekly' | 'monthly'>('daily')
const dateFrom = ref('')
const dateTo = ref('')
const loading = ref(false)

const timeOptions: TimeOption[] = [
  { label: 'Harian', value: 'daily' },
  { label: 'Mingguan', value: 'weekly' },
  { label: 'Bulanan', value: 'monthly' }
]

// Mock chart data
const chartData = ref({
  labels: ['20 Jun', '21 Jun', '22 Jun', '23 Jun', '24 Jun', '25 Jun', '26 Jun', '27 Jun', '28 Jun', '29 Jun', '30 Jun'],
  data: [150, 200, 180, 220, 250, 300, 280, 350, 320, 400, 450]
})

const chartStats = computed(() => {
  const data = chartData.value.data
  const total = data.reduce((sum, val) => sum + val, 0)
  const average = Math.round(total / data.length)
  const highest = Math.max(...data)
  const lowest = Math.min(...data)
  
  return { total, average, highest, lowest }
})

const chartOption = computed((): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: {
      color: '#374151'
    },
    formatter: (params: unknown) => {
      const point = Array.isArray(params) ? params[0] : params
      return `${point.name}<br/>Jumlah Surat: <strong>${point.value}</strong>`
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '8%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: chartData.value.labels,
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      color: '#64748b',
      fontSize: 12
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#64748b',
      fontSize: 12
    },
    splitLine: {
      lineStyle: {
        color: '#f1f5f9',
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: 'Jumlah Surat',
      type: 'line',
      data: chartData.value.data,
      smooth: true,
      lineStyle: {
        color: '#257941',
        width: 3
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(37, 121, 65, 0.2)' },
            { offset: 1, color: 'rgba(37, 121, 65, 0.05)' }
          ]
        }
      },
      itemStyle: {
        color: '#257941',
        borderColor: '#ffffff',
        borderWidth: 2
      },
      emphasis: {
        itemStyle: {
          borderWidth: 3,
          shadowBlur: 10,
          shadowColor: 'rgba(37, 121, 65, 0.4)'
        }
      },
      symbolSize: 8,
      symbol: 'circle'
    }
  ]
}))

const getTimeButtonClass = (value: string) => {
  const baseClasses = 'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200'
  const activeClasses = 'bg-[var(--primary-green)] text-white'
  const inactiveClasses = 'text-gray-700 hover:bg-gray-100'
  
  return [
    baseClasses,
    selectedTimeRange.value === value ? activeClasses : inactiveClasses
  ].join(' ')
}

const getChartDataForTimeRange = (timeRange: 'daily' | 'weekly' | 'monthly') => {
  switch (timeRange) {
    case 'weekly':
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [1200, 1500, 1300, 1800]
      }
    case 'monthly':
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [5000, 5500, 5200, 6000, 5800, 6200]
      }
    default:
      return {
        labels: ['20 Jun', '21 Jun', '22 Jun', '23 Jun', '24 Jun', '25 Jun', '26 Jun', '27 Jun', '28 Jun', '29 Jun', '30 Jun'],
        data: [150, 200, 180, 220, 250, 300, 280, 350, 320, 400, 450]
      }
  }
}

const updateChart = () => {
  const newData = getChartDataForTimeRange(selectedTimeRange.value)
  chartData.value = newData
}

const onChartReady = (_chart: ECharts) => {
  // Chart is ready
}

// Watch for time range changes
watch(selectedTimeRange, () => {
  updateChart()
})
</script>