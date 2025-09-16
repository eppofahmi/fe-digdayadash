<template>
  <div class="mb-8">
    <!-- Action Buttons - Left: Back, Right: Share & Link -->
    <div class="flex justify-between items-center mb-4">
      <!-- Back Button - Left -->
      <button
        @click="$router.push('/')"
        class="flex items-center gap-2 text-gray-600 hover:text-[var(--primary-green)] transition-colors duration-200"
      >
        <ArrowLeft class="w-4 h-4" />
        <span class="text-sm font-medium">Kembali</span>
      </button>

      <!-- Share & Link Buttons - Right -->
      <div class="flex gap-3">
        <button
          @click="showShareModal = true"
          class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--primary-green)] transition-colors duration-200 border border-gray-300 rounded-md"
          style="background: rgba(255, 255, 255, 1);"
        >
          <Share2 class="w-4 h-4" />
          Share
        </button>
        <button
          @click="handleCopyLink"
          class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--primary-green)] transition-colors duration-200 border border-gray-300 rounded-md"
          style="background: rgba(255, 255, 255, 1);"
        >
          <Link class="w-4 h-4" />
          Link
        </button>
      </div>
    </div>
    
    <!-- Statistics Grid -->
    <div class="grid grid-cols-3 gap-3">
      <BaseCard
        v-for="stat in statistics"
        :key="stat.label"
        :hoverable="true"
        :padding="false"
        class="text-center"
      >
        <div class="p-3">
          <div class="w-8 h-8 bg-[#daf8e3] rounded-lg flex items-center justify-center mx-auto mb-1">
            <component :is="stat.icon" class="w-4 h-4 text-[var(--secondary-teal)]" />
          </div>
          <div class="text-xs text-gray-600 mb-1 font-bold leading-tight uppercase text-center">
            <div v-for="line in stat.label.split(' ')" :key="line">{{ line }}</div>
          </div>
          <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-2" />
          <div>
            <span class="text-2xl font-bold text-gray-900">{{ stat.value }}</span>
            <span v-if="stat.percentage" class="text-base font-medium text-[#017534] ml-2">{{ stat.percentage }}</span>
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
    label: 'Surat Terkirim',
    value: '12,450',
    description: 'surat terkirim'
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