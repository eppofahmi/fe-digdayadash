<template>
  <div class="mb-6 sm:mb-8">
    <!-- Action Buttons - Left: Back, Right: Share & Link -->
    <div class="flex justify-between items-center mb-3 sm:mb-4">
      <!-- Back Button - Left -->
      <button
        class="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-[var(--primary-green)] transition-colors duration-200"
        @click="$router.push('/')"
      >
        <ArrowLeft class="w-4 h-4" />
        <span class="text-xs sm:text-sm font-medium">Kembali</span>
      </button>

      <!-- Share & Link Buttons - Right -->
      <div class="flex gap-2 sm:gap-3">
        <button
          class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-[var(--primary-green)] transition-colors duration-200 border border-gray-300 rounded-md"
          style="background: rgba(255, 255, 255, 1);"
          @click="showShareModal = true"
        >
          <Share2 class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span class="hidden sm:inline">Share</span>
        </button>
        <button
          class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-[var(--primary-green)] transition-colors duration-200 border border-gray-300 rounded-md"
          style="background: rgba(255, 255, 255, 1);"
          @click="handleCopyLink"
        >
          <Link class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span class="hidden sm:inline">Link</span>
        </button>
      </div>
    </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      <BaseCard
        v-for="stat in statistics"
        :key="stat.label"
        :hoverable="true"
        :padding="false"
        class="text-center"
      >
        <div class="p-2 sm:p-3">
          <div class="w-6 h-6 sm:w-8 sm:h-8 bg-[#daf8e3] rounded-lg flex items-center justify-center mx-auto mb-1">
            <component :is="stat.icon" class="w-3 h-3 sm:w-4 sm:h-4 text-[var(--secondary-teal)]" />
          </div>
          <div class="text-[10px] sm:text-xs text-gray-600 mb-1 font-bold leading-tight uppercase text-center">
            <div v-for="line in stat.label.split(' ')" :key="line">{{ line }}</div>
          </div>
          <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-1 sm:mb-2" />
          <div class="flex flex-row items-center justify-center gap-1 sm:gap-2">
            <span class="text-lg sm:text-2xl font-bold text-gray-900">{{ stat.value }}</span>
            <span v-if="stat.percentage" class="text-sm sm:text-base font-medium text-[#017534]">{{ stat.percentage }}</span>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Share Modal -->
    <DashboardShareModal
      v-model="showShareModal"
      :current-filters="currentFilters"
      @share="handleShare"
    />
  </div>
</template>

<script setup lang="ts">
import {
  MailCheck,
  Users,
  Send,
  MailPlus,
  BookMarked,
  StickyNote,
  Share2,
  Link,
  ArrowLeft
} from 'lucide-vue-next'
import type { Component } from 'vue'

interface Props {
  currentFilters?: Record<string, unknown>
}

const props = withDefaults(defineProps<Props>(), {
  currentFilters: () => ({})
})

interface StatisticCard {
  icon: Component
  label: string
  value: string
  description: string
  percentage?: string
}

const statistics: StatisticCard[] = [
  {
    icon: MailCheck,
    label: 'Total Kepengurusan',
    value: '10,621',
    description: 'pengurus terhubung'
  },
  {
    icon: Users,
    label: 'Pengurus Terhubung',
    value: '152/184',
    percentage: '50%',
    description: 'pengurus terhubung'
  },
  {
    icon: Send,
    label: 'Surat Keluar',
    value: '12,450',
    description: 'surat keluar'
  },
  {
    icon: MailPlus,
    label: 'Surat Masuk',
    value: '9,156',
    description: 'surat masuk'
  },
  {
    icon: BookMarked,
    label: 'Log Disposisi',
    value: '8,245',
    description: 'log disposisi'
  },
  {
    icon: StickyNote,
    label: 'Memo',
    value: '3,245',
    description: 'memo'
  }
]

// State
const showShareModal = ref(false)

// Composables
const { copyCurrentLink, shareViaEmail, exportData } = useSharing()

// Methods
const handleCopyLink = async () => {
  try {
    await copyCurrentLink(props.currentFilters)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

const handleShare = async (type: string, options?: Record<string, unknown>) => {
  try {
    switch (type) {
      case 'email':
        await shareViaEmail('Dashboard Persuratan PBNU - Statistics', {
          includeFilters: true,
          ...options
        })
        break
        
      case 'export':
        await exportData('statistics', options)
        break
        
      case 'schedule':
        // Handle schedule report - would open another modal
        console.log('Schedule report requested', options)
        break
        
      default:
        console.log('Share action:', type, options)
    }
  } catch (err) {
    console.error('Share failed:', err)
  }
}
</script>