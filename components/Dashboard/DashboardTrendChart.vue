<template>
  <BaseCard>
    <!-- Header -->
    <template #header>
      <div class="section-header">
        <div class="section-header-logo">
          <ChartSpline class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div class="flex-1">
          <div class="flex items-start gap-2">
            <h2 class="text-sm sm:text-base font-semibold text-white flex-1">
              Tren Surat Keluar
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

    <!-- Loading State -->
    <template v-if="loading">
      <div class="p-3 sm:p-4">
        <SkeletonChart />
      </div>
    </template>

    <!-- Actual Content -->
    <template v-else>
      <!-- Time Filter -->
      <div class="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <!-- Time Options -->
      <div class="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 w-full sm:w-auto">
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
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <span class="text-xs sm:text-sm text-gray-700 whitespace-nowrap">Dari</span>
          <input
            v-model="dateFrom"
            type="date"
            class="flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-[var(--primary-green)]"
            @change="updateChart"
          >
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <span class="text-xs sm:text-sm text-gray-700 whitespace-nowrap">Sampai</span>
          <input
            v-model="dateTo"
            type="date"
            class="flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-[var(--primary-green)]"
            @change="updateChart"
          >
        </div>
      </div>
    </div>

      <!-- Chart Container -->
      <div class="p-3 sm:p-4 h-64 sm:h-80 md:h-96">
        <BaseEChart
          :option="chartOption"
          height="100%"
          @chart-ready="onChartReady"
        />
      </div>

      <!-- Statistics Summary -->
      <div class="px-3 sm:px-4 py-3 bg-white grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <div class="text-center p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div class="text-[10px] sm:text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Total</div>
          <div class="text-lg sm:text-2xl font-bold text-gray-900">{{ chartStats.total }}</div>
        </div>
        <div class="text-center p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div class="text-[10px] sm:text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Rata Rata</div>
          <div class="text-lg sm:text-2xl font-bold text-gray-900">{{ chartStats.average }}</div>
        </div>
        <div class="text-center p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div class="text-[10px] sm:text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Tertinggi</div>
          <div class="text-lg sm:text-2xl font-bold text-gray-900">{{ chartStats.highest }}</div>
        </div>
        <div class="text-center p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div class="text-[10px] sm:text-xs text-gray-600 uppercase font-semibold tracking-wide mb-1">Terendah</div>
          <div class="text-lg sm:text-2xl font-bold text-gray-900">{{ chartStats.lowest }}</div>
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { ChartSpline, Info } from 'lucide-vue-next'
import type { ECharts, EChartsOption } from 'echarts'

interface TimeOption {
  label: string
  value: 'daily' | 'weekly' | 'monthly'
}

interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const selectedTimeRange = ref<'daily' | 'weekly' | 'monthly'>('daily')
const dateFrom = ref('')
const dateTo = ref('')
const showDescription = ref(false)

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
  const baseClasses = 'px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 flex-1 sm:flex-initial'
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