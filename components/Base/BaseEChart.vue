<template>
  <div ref="chartContainer" class="w-full h-full"/>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

interface Props {
  option: EChartsOption
  theme?: string
  height?: string | number
  width?: string | number
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: '',
  height: '400px',
  loading: false
})

const emit = defineEmits<{
  chartReady: [chart: ECharts]
  chartClick: [params: unknown]
}>()

const chartContainer = ref<HTMLDivElement | null>(null)
let chartInstance: ECharts | null = null

const initChart = () => {
  if (!chartContainer.value) return
  
  // Dispose existing chart
  if (chartInstance) {
    chartInstance.dispose()
  }
  
  // Initialize new chart
  chartInstance = echarts.init(chartContainer.value, props.theme)
  
  // Set option
  chartInstance.setOption(props.option)
  
  // Add event listeners
  chartInstance.on('click', (params) => {
    emit('chartClick', params)
  })
  
  // Handle window resize
  const handleResize = () => {
    chartInstance?.resize()
  }
  
  window.addEventListener('resize', handleResize)
  
  // Emit chart ready event
  emit('chartReady', chartInstance)
  
  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (chartInstance) {
      chartInstance.dispose()
    }
  })
}

// Update chart when option changes
watch(() => props.option, (newOption) => {
  if (chartInstance) {
    chartInstance.setOption(newOption, true)
  }
}, { deep: true })

// Handle loading state
watch(() => props.loading, (loading) => {
  if (chartInstance) {
    if (loading) {
      chartInstance.showLoading('default', {
        text: 'Loading...',
        color: '#257941',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
      })
    } else {
      chartInstance.hideLoading()
    }
  }
})

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

// Expose chart instance for parent component
defineExpose({
  chart: chartInstance ? readonly(chartInstance) : null,
  refresh: () => chartInstance?.resize(),
  dispose: () => chartInstance?.dispose()
})
</script>