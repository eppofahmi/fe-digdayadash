<template>
  <div>
    <!-- Hero Section -->
    <div class="relative min-h-[70vh] text-white overflow-hidden" style="background: linear-gradient(to bottom right, #00491E, #1E9A3F)">
      <!-- Left supergraphic -->
      <div class="absolute left-0 top-0 w-64 h-full opacity-30 pointer-events-none">
        <img
          src="/supergraphic-left.svg"
          alt=""
          class="h-full w-full object-contain object-left"
        >
      </div>

      <!-- Right supergraphic -->
      <div class="absolute right-0 top-0 w-96 h-full opacity-30 pointer-events-none">
        <img
          src="/supergraphic-right.svg"
          alt=""
          class="h-full w-full object-contain object-right"
        >
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-6xl mx-auto px-5 pt-20 pb-16">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">
            Portal Satu Data Nahdlatul Ulama
          </h1>
          <p class="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto">
            Platform terpadu yang mendukung pengelolaan data strategis seluruh ekosistem digital Nahdlatul Ulama
          </p>

          <div class="mb-8">
            <BaseButton variant="primary" size="lg" class="bg-white text-[var(--primary-green)] hover:bg-gray-100">
              Pelajari Selengkapnya
            </BaseButton>
          </div>

          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Masukkan Kata Kunci Pencarian"
                class="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 text-lg border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
              >
              <button class="absolute right-2 top-2 p-2 bg-[var(--primary-green)] text-white rounded-full hover:bg-[var(--primary-green-hover)] transition-colors">
                <Search class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="max-w-6xl mx-auto px-5 py-16">
      <!-- Katalog Dasbor Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Katalog Dasbor</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Dashboard Cards -->
          <BaseCard
            v-for="dashboard in dashboards"
            :key="dashboard.title"
            :hoverable="true"
            :padding="false"
            class="cursor-pointer overflow-hidden"
            @click="navigateTo(dashboard.href)"
          >
            <div class="flex flex-col h-full min-h-[300px]">
              <!-- Card Content - Takes up available space -->
              <div class="p-6 flex-1">
                <h3 class="text-lg font-bold text-gray-900 mb-3">{{ dashboard.title }}</h3>
                <p class="text-gray-600 text-sm leading-relaxed">{{ dashboard.description }}</p>
              </div>

              <!-- Card Footer - Always at bottom -->
              <div class="px-6 py-3 text-sm text-gray-500 flex justify-between items-center mt-auto" style="background-color: #E2E8F0;">
                <span>Update: {{ dashboard.lastUpdate }}</span>
                <ArrowRight class="w-4 h-4" />
              </div>
            </div>
          </BaseCard>
        </div>
      </section>

      <!-- Topik Katalog Data Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Topik Katalog Data</h2>

        <div class="flex flex-wrap gap-4">
          <div
            v-for="topic in topicsWithIcons"
            :key="topic.name"
            class="flex items-center gap-3 p-4 h-14 border-2 border-gray-400 rounded-lg bg-transparent hover:bg-[var(--primary-green)] hover:text-white hover:border-[var(--primary-green)] cursor-pointer transition-all duration-200 group"
          >
            <component :is="topic.icon" class="w-5 h-5 text-[var(--primary-green)] group-hover:text-white flex-shrink-0" />
            <span class="text-sm font-medium whitespace-nowrap">{{ topic.name }}</span>
          </div>
        </div>
      </section>

      <!-- Ekosistem Data dan Digital NU Section -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Ekosistem Data dan Digital NU</h2>
          <p class="text-gray-600">Platform digital terintegrasi untuk mendukung transformasi digital organisasi Nahdlatul Ulama</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- DIGDAYA Cards -->
          <BaseCard
            v-for="digdaya in digdayaApps"
            :key="digdaya.name"
            :hoverable="true"
            class="text-center cursor-pointer"
          >
            <div class="p-6">
              <!-- Logo -->
              <div class="w-20 h-20 mx-auto mb-6 bg-white rounded-xl shadow-md flex items-center justify-center">
                <img
                  src="/headerlogo.svg"
                  alt="PBNU Logo"
                  class="h-12 w-auto"
                >
              </div>

              <!-- Text Content -->
              <div>
                <h3 class="font-bold text-gray-900 mb-2">{{ digdaya.name }}</h3>
                <p class="text-sm text-gray-600 mb-3">{{ digdaya.subtitle }}</p>
                <p class="text-xs text-gray-500">{{ digdaya.description }}</p>
              </div>
            </div>
          </BaseCard>
        </div>
      </section>

      <!-- SATUDATA Access Section -->
      <section>
        <div class="rounded-xl p-8 text-white" style="background: linear-gradient(to right, #134E4A, #00000000);">
          <h2 class="text-2xl font-bold mb-4">Akses SATUDATA Digdaya NU</h2>
          <p class="text-white text-opacity-90 w-[60%]">
            SATUDATA Digdaya NU menghadirkan pusat data yang akurat, terbuka, dan dapat diakses oleh publik untuk mendukung transparansi dan pengambilan kebijakan di lingkungan Nahdlatul Ulama.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Search,
  ArrowRight,
  Mail,
  Users,
  UserCheck,
  School,
  Megaphone,
  AlertTriangle,
  GraduationCap,
  Monitor,
  Building2,
  UsersRound,
  TrendingUp,
  Heart,
  Moon,
  Home,
  Palette,
  Scale,
  DollarSign,
  TreePine,
  HelpCircle
} from 'lucide-vue-next'

// Page metadata
useHead({
  title: 'Portal Satu Data Nahdlatul Ulama',
  meta: [
    {
      name: 'description',
      content: 'Platform terpadu yang mendukung pengelolaan data strategis seluruh ekosistem digital Nahdlatul Ulama'
    }
  ]
})

// State
const searchQuery = ref('')

// Data
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

const topicsWithIcons = [
  { name: 'Dakwah', icon: Megaphone },
  { name: 'Kebencanaan', icon: AlertTriangle },
  { name: 'Pendidikan', icon: GraduationCap },
  { name: 'Media', icon: Monitor },
  { name: 'Kemasjidan', icon: Building2 },
  { name: 'Organisasi, Kaderisasi, dan Keanggotaan (OKK)', icon: UsersRound },
  { name: 'Perekonomian', icon: TrendingUp },
  { name: 'Kesehatan', icon: Heart },
  { name: 'Falakiyah', icon: Moon },
  { name: 'Keluarga Maslahat', icon: Home },
  { name: 'Seni dan Budaya', icon: Palette },
  { name: 'Hukum', icon: Scale },
  { name: 'ZISWAF', icon: DollarSign },
  { name: 'Wakaf dan Tanah', icon: TreePine },
  { name: 'Layanan Lain', icon: HelpCircle }
]

const digdayaApps = [
  {
    name: 'DIGDAYA Persuratan',
    subtitle: 'Digdaya Persuratan',
    description: 'Sistem Manajemen Surat dan Tanda Tangan Digital',
    icon: Mail
  },
  {
    name: 'DIGDAYA Kepengurusan',
    subtitle: 'Digdaya Kepengurusan',
    description: 'Sistem Manajemen Pengurus dan Agenda',
    icon: Users
  },
  {
    name: 'DIGDAYA Kader',
    subtitle: 'Digdaya Kader',
    description: 'Sistem Tata Kelola Kaderisasi',
    icon: UserCheck
  },
  {
    name: 'DIGDAYA Pesantren',
    subtitle: 'Digdaya Pesantren',
    description: 'Sistem Manajemen Pesantren',
    icon: School
  }
]
</script>