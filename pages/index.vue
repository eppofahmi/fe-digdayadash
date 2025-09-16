<template>
  <div>
    <!-- Hero Section with Header Background -->
    <div class="relative text-white overflow-hidden w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[680px] max-w-[1440px] mx-auto -mt-16 sm:-mt-20">
      <!-- Optimized Hero Image -->
      <NuxtImg
        src="/hero-image.png"
        alt="Portal Satu Data Nahdlatul Ulama Hero Background"
        class="absolute inset-0 w-full h-full object-cover"
        style="object-position: center 75%;"
        :quality="80"
        format="webp"
        loading="eager"
        preload
        sizes="xs:320px sm:640px md:768px lg:1024px xl:1280px xxl:1536px"
      />
      <!-- Gradient overlay on top of hero image -->
      <div class="absolute inset-0 z-10" style="background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 26%, rgba(0,0,0,0.5) 49%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.8) 95%);" />
      <!-- Left supergraphic -->
      <div class="absolute left-0 top-0 w-24 sm:w-32 md:w-48 lg:w-64 h-full opacity-20 sm:opacity-30 pointer-events-none z-20">
        <img
          src="/supergraphic-left.svg"
          alt=""
          class="h-full w-full object-contain object-left"
        >
      </div>

      <!-- Right supergraphic -->
      <div class="absolute right-0 top-0 w-32 sm:w-48 md:w-72 lg:w-96 h-full opacity-20 sm:opacity-30 pointer-events-none z-20">
        <img
          src="/supergraphic-right.svg"
          alt=""
          class="h-full w-full object-contain object-right"
        >
      </div>

      <!-- Content -->
      <div class="relative z-30 max-w-6xl mx-auto px-4 sm:px-5 pt-24 sm:pt-40 md:pt-64 lg:pt-96 pb-6 sm:pb-8 md:pb-16">
        <div class="text-center">
          <h1 class="mb-3 sm:mb-4 md:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium" style="font-family: 'Helvetica Neue', sans-serif; letter-spacing: 0.5%; text-align: center; line-height: 1.1;">
            Portal Satu Data Nahdlatul Ulama
          </h1>
          <p class="mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto text-white text-opacity-90 text-xs sm:text-sm md:text-base px-2" style="font-family: 'Helvetica Neue', sans-serif; letter-spacing: 0.5%; text-align: center; line-height: 1.2;">
            Platform terpadu yang mendukung pengelolaan data strategis seluruh ekosistem digital Nahdlatul Ulama
          </p>

          <!-- Search Bar -->
          <div class="flex justify-center mb-3 sm:mb-4 md:mb-6 px-4">
            <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl">
              <Search class="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Masukkan Kata Kunci Pencarian"
                class="w-full h-8 sm:h-10 md:h-12 border shadow-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 pl-8 sm:pl-10 md:pl-12 pr-3 sm:pr-4 md:pr-8 rounded-full text-center text-gray-900 text-xs sm:text-sm md:text-base"
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
    <div class="max-w-6xl mx-auto px-3 sm:px-4 md:px-5 py-8 sm:py-12 md:py-16">
      <!-- Katalog Dasbor Section -->
      <section id="katalog-dasbor" class="mb-8 sm:mb-12 md:mb-16">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Katalog Dasbor</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <!-- Dashboard Cards -->
          <BaseCard
            v-for="dashboard in dashboards"
            :key="dashboard.title"
            :hoverable="true"
            :padding="false"
            class="cursor-pointer overflow-hidden"
            @click="navigateTo(dashboard.href)"
          >
            <div class="flex flex-col h-full min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
              <!-- Card Content - Takes up available space -->
              <div class="p-2 sm:p-3 pb-1 flex-1">
                <h3 class="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight">{{ dashboard.title }}</h3>
                <p class="text-gray-600 text-xs leading-relaxed line-clamp-3">{{ dashboard.description }}</p>
              </div>

              <!-- Card Footer - Always at bottom -->
              <div class="px-3 sm:px-4 py-2 text-xs text-gray-500 flex justify-between items-center" style="background-color: #E2E8F0;">
                <span>Update: {{ dashboard.lastUpdate }}</span>
                <ArrowRight class="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
          </BaseCard>
        </div>
      </section>

      <!-- Topik Katalog Data Section -->
      <section class="mb-8 sm:mb-12 md:mb-16">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Topik Katalog Data</h2>

        <div class="flex flex-wrap gap-1 sm:gap-2">
          <div
            v-for="topic in topicsWithIcons"
            :key="topic.name"
            class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 h-8 sm:h-10 border-2 border-gray-400 rounded-lg bg-transparent hover:bg-[var(--primary-green)] hover:text-white hover:border-[var(--primary-green)] cursor-pointer transition-all duration-200 group"
          >
            <component :is="topic.icon" class="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary-green)] group-hover:text-white flex-shrink-0" />
            <span class="text-xs sm:text-sm font-medium whitespace-nowrap">{{ topic.name }}</span>
          </div>
        </div>
      </section>

      <!-- Ekosistem Data dan Digital NU Section -->
      <section class="mb-8 sm:mb-12 md:mb-16">
        <div class="text-center mb-4 sm:mb-6">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Ekosistem Data dan Digital NU</h2>
          <p class="text-gray-600 text-sm sm:text-base px-2 sm:px-0">Platform digital terintegrasi untuk mendukung transformasi digital organisasi Nahdlatul Ulama</p>
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
              <div class="text-center cursor-pointer p-2 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <!-- Logo and Text as Unified Component -->
                <div class="flex flex-col items-center">
                  <!-- Logo -->
                  <div class="w-24 h-24 sm:w-32 sm:h-32 -mb-6 sm:-mb-10">
                    <img
                      :src="digdaya.logo"
                      :alt="digdaya.name"
                      class="w-full h-full object-contain"
                    >
                  </div>

                  <!-- Text Content -->
                  <p class="text-xs sm:text-sm text-gray-700 font-medium px-1 sm:px-2 leading-tight">{{ digdaya.description }}</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <!-- SATUDATA Access Section -->
      <section>
        <div class="rounded-3xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden"
             style="
               background:
                 linear-gradient(90deg, #134E4A 45.35%, rgba(0, 0, 0, 0) 100%),
                 url('/section-satudata.png') center / cover no-repeat,
                 #000000;
             ">
          <div class="relative z-10">
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">Akses SATUDATA Digdaya NU</h2>
            <p class="text-white text-opacity-90 w-full sm:w-[80%] md:w-[60%] text-sm sm:text-base">
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