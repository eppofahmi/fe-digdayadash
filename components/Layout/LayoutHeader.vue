<template>
  <header class="bg-white text-gray-800 py-2 sticky top-0 z-50 shadow-sm">
    <div class="max-w-6xl mx-auto px-5">
      <div class="flex items-center justify-between">
        <!-- Logo Section -->
        <div class="flex items-center">
          <div class="logo cursor-pointer" @click="navigateTo('/')">
            <img
              src="/headerlogo.svg"
              alt="PBNU Dashboard"
              class="h-10 w-auto"
            >
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex gap-8">
          <!-- Dasbor with Dropdown -->
          <div class="relative" @mouseleave="showDropdown = false">
            <button
              @mouseenter="showDropdown = true"
              :class="navItemClasses(isDashboardActive)"
              class="flex items-center gap-1"
            >
              Dasbor
              <ChevronDown class="w-4 h-4" />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-show="showDropdown"
              @mouseenter="showDropdown = true"
              class="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <NuxtLink
                v-for="dashboard in dashboardItems"
                :key="dashboard.href"
                :to="dashboard.href"
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary-green)] transition-colors"
              >
                <div class="font-medium">{{ dashboard.label }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ dashboard.description }}</div>
              </NuxtLink>
            </div>
          </div>

          <!-- Tentang -->
          <NuxtLink
            to="/tentang"
            :class="navItemClasses(route.path === '/tentang')"
          >
            Tentang
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

const route = useRoute()
const showDropdown = ref(false)

const dashboardItems = [
  {
    label: 'Dashboard Monitoring Persuratan NU',
    description: 'Sistem tata kelola administrasi persuratan dan dokumen organisasi',
    href: '/dashboard-persuratan'
  },
  {
    label: 'Dashboard Persebaran Pesantren NU',
    description: 'Sistem manajemen data dan layanan organisasi pesantren',
    href: '/dashboard-pesantren'
  },
  {
    label: 'Dashboard Persebaran Kader NU',
    description: 'Sistem pengelolaan kegiatan kaderisasi NU',
    href: '/dashboard-kader'
  },
  {
    label: 'Dashboard Profil Kepengurusan NU',
    description: 'Sistem pendataan dan pengelolaan administrasi kepengurusan',
    href: '/dashboard-kepengurusan'
  }
]

const isDashboardActive = computed(() => {
  return dashboardItems.some(item => route.path === item.href)
})

const navItemClasses = (active?: boolean) => {
  const baseClasses = 'text-gray-600 no-underline py-2 border-b-2 border-transparent transition-colors duration-200'
  const activeClasses = 'text-[var(--primary-green)] border-[var(--primary-green)]'
  const hoverClasses = 'hover:text-[var(--primary-green)] hover:border-[var(--primary-green)] hover:border-opacity-50'

  return [
    baseClasses,
    active ? activeClasses : hoverClasses
  ].join(' ')
}
</script>