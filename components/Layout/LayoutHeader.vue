<template>
  <header class="text-gray-800 py-2 sticky top-0 z-50 transition-all duration-300" :class="headerClasses">
    <div class="max-w-6xl mx-auto px-3 sm:px-5">
      <div class="flex items-center justify-between">
        <!-- Logo Section -->
        <div class="flex items-center">
          <div class="logo cursor-pointer" @click="navigateTo('/')">
            <img
              :src="logoSrc"
              alt="PBNU Dashboard"
              class="h-8 sm:h-10 w-auto transition-opacity duration-300"
            >
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="sm:hidden p-2"
          :class="isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>

        <!-- Desktop Navigation Menu -->
        <nav class="hidden sm:flex gap-6 lg:gap-8">
          <!-- Dasbor with Dropdown -->
          <div class="relative" @mouseleave="showDropdown = false">
            <button
              :class="navItemClasses(isDashboardActive)"
              class="flex items-center gap-1"
              @mouseenter="showDropdown = true"
            >
              Dasbor
              <ChevronDown class="w-4 h-4" />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-show="showDropdown"
              class="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              @mouseenter="showDropdown = true"
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
            :class="navItemClasses(route?.path === '/tentang')"
          >
            Tentang
          </NuxtLink>
        </nav>
      </div>

    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="mobileMenuOpen"
        class="fixed inset-0 bg-black/50 z-40 sm:hidden"
        @click="mobileMenuOpen = false"
      />
    </Transition>

    <!-- Mobile Menu Panel -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-show="mobileMenuOpen"
        class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 sm:hidden overflow-y-auto"
      >
        <!-- Mobile Menu Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800">Menu</h3>
          <button
            class="p-2 text-gray-600 hover:text-gray-800"
            @click="mobileMenuOpen = false"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Mobile Menu Content -->
        <div class="p-4 space-y-3">
          <!-- Dasbor Section -->
          <div>
            <button
              class="w-full text-left py-3 px-3 rounded-lg flex items-center justify-between text-gray-800 hover:bg-gray-50 transition-colors"
              @click="mobileDashboardOpen = !mobileDashboardOpen"
            >
              <span class="font-medium">Dasbor</span>
              <ChevronDown class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': mobileDashboardOpen }" />
            </button>

            <!-- Mobile Dashboard Submenu -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[500px]"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-[500px]"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-show="mobileDashboardOpen" class="mt-2 space-y-1 overflow-hidden">
                <NuxtLink
                  v-for="dashboard in dashboardItems"
                  :key="dashboard.href"
                  :to="dashboard.href"
                  class="block px-4 py-3 ml-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary-green)] rounded-lg transition-colors border-l-2 border-gray-200 hover:border-[var(--primary-green)]"
                  @click="mobileMenuOpen = false"
                >
                  <div class="font-medium">{{ dashboard.label }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ dashboard.description }}</div>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Tentang -->
          <NuxtLink
            to="/tentang"
            class="block py-3 px-3 rounded-lg font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            @click="mobileMenuOpen = false"
          >
            Tentang
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ChevronDown, Menu, X } from 'lucide-vue-next'

const route = useRoute()
const showDropdown = ref(false)
const mobileMenuOpen = ref(false)
const mobileDashboardOpen = ref(false)
const scrollY = ref(0)

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
  return dashboardItems.some(item => route?.path === item.href)
})

const isHomePage = computed(() => {
  return route?.path === '/'
})

const isScrolled = computed(() => {
  return scrollY.value > 100 // Trigger transition after 100px scroll
})

const headerClasses = computed(() => {
  if (!isHomePage.value) {
    // Non-homepage: always solid
    return 'bg-white shadow-sm text-gray-800'
  } else {
    // Homepage: dynamic based on scroll
    if (isScrolled.value) {
      return 'bg-white shadow-sm text-gray-800'
    } else {
      return 'bg-transparent text-white'
    }
  }
})

const logoSrc = computed(() => {
  if (isHomePage.value && !isScrolled.value) {
    // Homepage before scroll: white logo for transparent background
    return '/footerlogo.svg'
  } else {
    // Homepage after scroll OR other pages: dark logo for white background
    return '/headerlogo.svg'
  }
})

// Handle scroll events
onMounted(() => {
  const handleScroll = () => {
    scrollY.value = window.scrollY
  }

  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

const navItemClasses = (active?: boolean) => {
  if (isHomePage.value && !isScrolled.value) {
    // Homepage before scroll: white text on transparent background
    const baseClasses = 'text-white no-underline py-2 border-b-2 border-transparent transition-colors duration-300'
    const activeClasses = 'text-white border-white'
    const hoverClasses = 'hover:text-white hover:border-white hover:border-opacity-50'

    return [
      baseClasses,
      active ? activeClasses : hoverClasses
    ].join(' ')
  } else {
    // Homepage after scroll OR other pages: dark text on white background
    const baseClasses = 'text-gray-600 no-underline py-2 border-b-2 border-transparent transition-colors duration-300'
    const activeClasses = 'text-[var(--primary-green)] border-[var(--primary-green)]'
    const hoverClasses = 'hover:text-[var(--primary-green)] hover:border-[var(--primary-green)] hover:border-opacity-50'

    return [
      baseClasses,
      active ? activeClasses : hoverClasses
    ].join(' ')
  }
}
</script>