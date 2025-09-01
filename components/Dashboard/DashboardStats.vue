<template>
  <div class="mb-8">
    <!-- Action Buttons - Top Right -->
    <div class="flex justify-end mb-4">
      <div class="flex gap-3">
        <BaseButton variant="secondary" size="sm" @click="handleShare">
          Share
        </BaseButton>
        <BaseButton variant="secondary" size="sm" @click="handleCopyLink">
          Link
        </BaseButton>
      </div>
    </div>
    
    <!-- Statistics Grid -->
    <div class="grid grid-cols-3 gap-4">
      <BaseCard
        v-for="stat in statistics"
        :key="stat.label"
        :hoverable="true"
        class="text-center"
      >
        <div class="w-10 h-10 bg-[#daf8e3] rounded-lg flex items-center justify-center mx-auto mb-2">
          <component :is="stat.icon" class="w-4 h-4 text-[var(--secondary-teal)]" />
        </div>
        <div class="text-sm text-gray-600 mb-2 font-medium">{{ stat.label }}</div>
        <div class="text-3xl font-bold text-gray-900 mb-1">{{ stat.value }}</div>
        <div class="text-sm text-gray-600">{{ stat.description }}</div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MailCheck, Users, Send, MailPlus, BookMarked, StickyNote } from 'lucide-vue-next'
import type { Component } from 'vue'

interface StatisticCard {
  icon: Component
  label: string
  value: string
  description: string
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
    description: '50%'
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

const handleShare = () => {
  console.log('Share statistics')
}

const handleCopyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    console.log('Link copied')
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}
</script>