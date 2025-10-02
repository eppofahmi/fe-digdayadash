<template>
  <div>
    <div class="max-w-6xl mx-auto px-3 sm:px-5">
      <!-- Dashboard Header -->
      <DashboardHeader />

      <!-- Statistics Cards -->
      <DashboardStats />

      <!-- Activation Table -->
      <div class="mb-6 sm:mb-8">
        <DashboardActivationTable />
      </div>

      <!-- Statistics Table -->
      <div class="mb-6 sm:mb-8">
        <DashboardStatisticsTable />
      </div>

      <!-- Trend Chart -->
      <div class="mb-6 sm:mb-8">
        <DashboardTrendChart />
      </div>
    </div>

    <!-- Katalog Dasbor Section -->
    <section
      class="flex flex-col items-center px-5 sm:px-16 md:px-20 lg:px-24 py-11 gap-9"
      style="background: #F1F5F9;"
    >
    <div class="max-w-6xl w-full">
      <h2
        class="text-gray-900 mb-8 text-left"
        style="font-family: Inter; font-weight: 600; font-size: 20px; line-height: 100%; letter-spacing: 0.5%;"
      >Katalog Dasbor</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Dashboard Cards -->
        <BaseCard
          v-for="dashboard in dashboards"
          :key="dashboard.title"
          :hoverable="true"
          :padding="false"
          class="cursor-pointer overflow-hidden"
          @click="navigateTo(dashboard.href)"
        >
          <div class="flex flex-col h-full min-h-[140px] sm:min-h-[150px]">
            <!-- Card Content - Takes up available space -->
            <div class="p-2 sm:p-3 pb-1 flex-1">
              <h3 class="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight">{{ dashboard.title }}</h3>
              <p class="text-gray-600 text-xs leading-relaxed line-clamp-4">{{ dashboard.description }}</p>
            </div>

            <!-- Card Footer - Static at bottom -->
            <div class="px-3 sm:px-4 py-2 text-xs text-gray-500 flex justify-between items-center mt-auto" style="background-color: #E2E8F0;">
              <span>Update: {{ dashboard.lastUpdate }}</span>
              <ArrowRight class="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

// Page metadata
useHead({
  title: 'Dashboard Implementasi Persuratan NU',
  meta: [
    {
      name: 'description',
      content: 'Monitoring dan evaluasi implementasi sistem persuratan digital di seluruh kepengurusan NU'
    }
  ]
})

// Dashboard data for Katalog Dasbor
const dashboards = [
  {
    title: 'Dashboard Monitoring Persuratan NU',
    description: 'Sistem tata kelola administrasi persuratan dan dokumen organisasi',
    lastUpdate: '30 Jul 2025',
    href: '/dashboard-persuratan'
  },
  {
    title: 'Dashboard Persebaran Pesantren NU',
    description: 'Sistem yang digunakan untuk tiap tingkat kepengurusan melakukan manajemen data dan layanan organisasi.',
    lastUpdate: '30 Jul 2025',
    href: '/dashboard-pesantren'
  },
  {
    title: 'Dashboard Persebaran Kader NU',
    description: 'Sistem untuk mempermudah dan mempercepat pengelolaan kegiatan kaderisasi NU, mulai dari tingkat ranting hingga tingkat nasional.',
    lastUpdate: '30 Jul 2025',
    href: '/dashboard-kader'
  },
  {
    title: 'Dashboard Profil Kepengurusan NU',
    description: 'Sistem yang dirancang untuk pendataan dan pengelolaan administrasi pondok pesantren secara terpusat dan terintegrasi.',
    lastUpdate: '30 Jul 2025',
    href: '/dashboard-kepengurusan'
  }
]
</script>