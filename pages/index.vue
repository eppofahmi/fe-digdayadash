<template>
  <div>
    <!-- Hero Section with Header Background -->
    <div class="relative text-white overflow-hidden w-full min-h-[500px] md:min-h-[600px] lg:min-h-[680px] max-w-[1440px] mx-auto -mt-20 bg-cover bg-no-repeat" style="background-image: url('/hero-image.png'); background-position: center 75%;">
      <!-- Gradient overlay on top of hero image -->
      <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 26%, rgba(0,0,0,0.5) 49%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.8) 95%);" />
      <!-- Left supergraphic -->
      <div class="absolute left-0 top-0 w-32 md:w-48 lg:w-64 h-full opacity-30 pointer-events-none z-20">
        <img
          src="/supergraphic-left.svg"
          alt=""
          class="h-full w-full object-contain object-left"
        >
      </div>

      <!-- Right supergraphic -->
      <div class="absolute right-0 top-0 w-48 md:w-72 lg:w-96 h-full opacity-30 pointer-events-none z-20">
        <img
          src="/supergraphic-right.svg"
          alt=""
          class="h-full w-full object-contain object-right"
        >
      </div>

      <!-- Content -->
      <div class="relative z-30 max-w-6xl mx-auto px-4 md:px-5 pt-40 md:pt-64 lg:pt-96 pb-8 md:pb-16">
        <div class="text-center">
          <h1 class="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-medium" style="font-family: 'Helvetica Neue', sans-serif; letter-spacing: 0.5%; text-align: center; line-height: 1.1;">
            Portal Satu Data Nahdlatul Ulama
          </h1>
          <p class="mb-6 md:mb-8 max-w-3xl mx-auto text-white text-opacity-90 text-sm md:text-base" style="font-family: 'Helvetica Neue', sans-serif; letter-spacing: 0.5%; text-align: center; line-height: 1.2;">
            Platform terpadu yang mendukung pengelolaan data strategis seluruh ekosistem digital Nahdlatul Ulama
          </p>

          <!-- Search Bar -->
          <div class="flex justify-center mb-4 md:mb-6 px-4">
            <div class="relative w-full max-w-sm md:max-w-lg lg:max-w-3xl">
              <Search class="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Masukkan Kata Kunci Pencarian"
                class="w-full h-10 md:h-12 border shadow-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 pl-10 md:pl-12 pr-4 md:pr-8 rounded-full text-center text-gray-900 text-sm md:text-base"
                style="font-family: 'Inter', sans-serif; font-weight: 500; letter-spacing: 0.5%;"
              >
            </div>
          </div>

          <!-- Learn More Text -->
          <p class="text-white text-opacity-80 mb-2">
            Pelajari Selengkapnya
          </p>

          <!-- Scroll Indicator -->
          <div class="flex flex-col items-center cursor-pointer mb-1" @click="scrollToBottom">
            <div class="border border-white border-opacity-60 flex flex-col items-center justify-center relative" style="width: 20px; height: 32px; padding-top: 8px; padding-right: 2px; padding-bottom: 8px; padding-left: 2px; border-radius: 400px; border-width: 1px; opacity: 1;">
              <div class="w-1 h-2 bg-white bg-opacity-60 rounded-full animate-bounce" />
              <svg class="w-3 h-3 text-white text-opacity-60 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
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
            <div class="flex flex-col h-full min-h-[220px]">
              <!-- Card Content - Takes up available space -->
              <div class="p-4 pb-2 flex-1">
                <h3 class="text-base font-bold text-gray-900 mb-2">{{ dashboard.title }}</h3>
                <p class="text-gray-600 text-xs leading-relaxed">{{ dashboard.description }}</p>
              </div>

              <!-- Card Footer - Always at bottom -->
              <div class="px-4 py-2 text-xs text-gray-500 flex justify-between items-center" style="background-color: #E2E8F0;">
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

        <div class="flex flex-wrap gap-2">
          <div
            v-for="topic in topicsWithIcons"
            :key="topic.name"
            class="flex items-center gap-2 px-3 py-2 h-10 border-2 border-gray-400 rounded-lg bg-transparent hover:bg-[var(--primary-green)] hover:text-white hover:border-[var(--primary-green)] cursor-pointer transition-all duration-200 group"
          >
            <component :is="topic.icon" class="w-5 h-5 text-[var(--primary-green)] group-hover:text-white flex-shrink-0" />
            <span class="text-sm font-medium whitespace-nowrap">{{ topic.name }}</span>
          </div>
        </div>
      </section>

      <!-- Ekosistem Data dan Digital NU Section -->
      <section class="mb-16">
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Ekosistem Data dan Digital NU</h2>
          <p class="text-gray-600">Platform digital terintegrasi untuk mendukung transformasi digital organisasi Nahdlatul Ulama</p>
        </div>

        <!-- Swiper Container -->
        <div class="relative">
          <Swiper
            :modules="[]"
            :slides-per-view="2"
            :space-between="2"
            :navigation="false"
            :centered-slides="true"
            :breakpoints="{
              640: { slidesPerView: 2.5, spaceBetween: 2, centeredSlides: true },
              1024: { slidesPerView: 3.5, spaceBetween: 2, centeredSlides: true }
            }"
            class="ekosistem-swiper"
          >
            <SwiperSlide
              v-for="digdaya in digdayaApps"
              :key="digdaya.name"
            >
              <!-- DIGDAYA Item -->
              <div class="text-center cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <!-- Logo and Text as Unified Component -->
                <div class="flex flex-col items-center">
                  <!-- Logo -->
                  <div class="w-32 h-32 -mb-10">
                    <img
                      :src="digdaya.logo"
                      :alt="digdaya.name"
                      class="w-full h-full object-contain"
                    >
                  </div>

                  <!-- Text Content -->
                  <p class="text-sm text-gray-700 font-medium px-2 leading-none">{{ digdaya.description }}</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <!-- SATUDATA Access Section -->
      <section>
        <div class="rounded-xl p-8 text-white relative overflow-hidden" style="background-image: url('/b70c4a3f65888845e84b255d615b8ce4ad5e2af7.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
          <!-- Gradient overlay on top of image -->
          <div class="absolute inset-0 bg-gradient-to-r from-[#134E4A] via-[#134E4A]/80 to-transparent rounded-xl" />
          <div class="relative z-10">
            <h2 class="text-2xl font-bold mb-4">Akses SATUDATA Digdaya NU</h2>
            <p class="text-white text-opacity-90 w-[60%]">
              SATUDATA Digdaya NU menghadirkan pusat data yang akurat, terbuka, dan dapat diakses oleh publik untuk mendukung transparansi dan pengambilan kebijakan di lingkungan Nahdlatul Ulama.
            </p>
          </div>
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
  HandHeart,
  TreePalm,
  HelpCircle
} from 'lucide-vue-next'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

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

// Functions
const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

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
  { name: 'ZISWAF', icon: HandHeart },
  { name: 'Wakaf dan Tanah', icon: TreePalm },
  { name: 'Layanan Lain', icon: HelpCircle }
]

const digdayaApps = [
  {
    name: 'DIGDAYA Persuratan',
    subtitle: 'Digdaya Persuratan',
    description: 'Sistem Manajemen Surat dan Tanda Tangan Digital',
    icon: Mail,
    logo: '/logo-persuratan.svg'
  },
  {
    name: 'DIGDAYA Kepengurusan',
    subtitle: 'Digdaya Kepengurusan',
    description: 'Sistem Manajemen Pengurus dan Agenda',
    icon: Users,
    logo: '/logo-kepengurusan.svg'
  },
  {
    name: 'DIGDAYA Kader',
    subtitle: 'Digdaya Kader',
    description: 'Sistem Tata Kelola Kaderisasi',
    icon: UserCheck,
    logo: '/logo-kader.png'
  },
  {
    name: 'DIGDAYA Pesantren',
    subtitle: 'Digdaya Pesantren',
    description: 'Sistem Manajemen Pesantren',
    icon: School,
    logo: '/logo-pesantren.svg'
  }
]
</script>

<style>
.ekosistem-swiper .swiper-button-next,
.ekosistem-swiper .swiper-button-prev {
  color: #067936;
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ekosistem-swiper .swiper-button-next:after,
.ekosistem-swiper .swiper-button-prev:after {
  font-size: 16px;
  font-weight: bold;
}


.ekosistem-swiper .swiper-slide {
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.ekosistem-swiper .swiper-slide-active,
.ekosistem-swiper .swiper-slide-next {
  opacity: 1;
}
</style>