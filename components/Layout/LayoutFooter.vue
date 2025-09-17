<template>
  <footer class="text-white relative overflow-hidden px-4 py-6 md:px-16 lg:px-16 lg:py-12" style="background: linear-gradient(85.31deg, #292D32 3.07%, #003317 98.98%); border-left: 1px solid transparent;">
    <!-- Background Image - Top Right -->
    <ClientOnly>
      <div class="absolute top-0 right-0 pointer-events-none">
        <img
          src="/footer-dashboard.svg"
          alt=""
          class="h-auto w-auto object-contain"
        >
      </div>
    </ClientOnly>

    <div class="max-w-none mx-auto relative z-10">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <!-- Logo and Description -->
        <div class="w-full lg:w-[45%]">
          <img
            src="/footer-logo2.svg"
            alt="PBNU Logo"
            class="h-8 md:h-12 w-auto mb-3 md:mb-4"
          >
          <p class="text-gray-300 text-xs md:text-xs leading-4 md:leading-4">
            <span class="font-bold">Digdaya Dashboard</span> adalah pusat kendali data Nahdlatul Ulama yang menghadirkan integrasi, pengelolaan, dan visualisasi data dalam satu sistem terpadu untuk mendukung transparansi, kolaborasi, dan transformasi digital NU.
          </p>
        </div>

        <!-- Content Sections -->
        <div class="w-full lg:w-[55%]">
          <!-- Mobile: Stack all columns vertically -->
          <div class="grid grid-cols-2 sm:grid-cols-2 lg:flex lg:justify-end gap-4 lg:gap-6">
            <!-- Navigation Column -->
            <div class="lg:w-auto lg:flex-shrink-0">
              <h3 class="text-white mb-2 text-xs font-bold leading-4">Navigasi</h3>
              <div class="space-y-1">
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 whitespace-nowrap">Beranda</a></div>
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 whitespace-nowrap">Tentang</a></div>
              </div>
            </div>

            <!-- Support Column -->
            <div class="lg:w-auto lg:flex-shrink-0">
              <h3 class="text-white mb-2 text-xs font-bold leading-4">Pusat Bantuan</h3>
              <div class="space-y-1">
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 whitespace-nowrap">Kebijakan Privasi</a></div>
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 whitespace-nowrap">Syarat dan Ketentuan</a></div>
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 whitespace-nowrap">Hubungi Kami</a></div>
              </div>
            </div>

            <!-- Ecosystem Column -->
            <div class="lg:w-auto lg:flex-shrink-0 col-span-2 lg:col-span-1">
              <h3 class="text-white mb-2 text-xs font-bold leading-4">Ekosistem</h3>
              <div class="space-y-1 grid grid-cols-2 lg:grid-cols-1 gap-x-2 lg:gap-x-0">
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 lg:whitespace-nowrap">Digdaya</a></div>
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 lg:whitespace-nowrap">Digdaya Persuratan</a></div>
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 lg:whitespace-nowrap">Digdaya Kepengurusan</a></div>
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 lg:whitespace-nowrap">Digdaya Kader</a></div>
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 lg:whitespace-nowrap">Digdaya Pesantren</a></div>
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 lg:whitespace-nowrap">NU.ID</a></div>
                <div><a href="#" class="text-gray-300 hover:text-white transition-colors text-xs leading-4 lg:whitespace-nowrap">Git NU</a></div>
              </div>
            </div>

            <!-- Contact Info Column -->
            <div class="lg:flex-1 col-span-2 lg:col-span-1">
              <h3 class="text-white mb-2 text-xs font-bold leading-4">Kontak</h3>
              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <MapPin class="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div class="text-gray-300 text-xs leading-4">
                    <p class="font-bold">Gedung PBNU</p>
                    <p class="text-xs">Jl. Kramat Raya No.164, RT.7/RW.2, Kenari, Senen, Central Jakarta City, Jakarta 10110</p>
                    <p class="mt-1">Telepon: (021) 31923033</p>
                  </div>
                </div>

                <div class="flex items-start gap-2">
                  <Mail class="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div class="text-gray-300 text-xs leading-4">
                    <p class="font-bold">Email</p>
                    <p>digitalteam@mail.nu.id</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Separator Line -->
      <div class="w-full mt-4" style="height: 1px; background-color: rgba(255, 255, 255, 0.4);" />

    </div>
  </footer>
</template>

<script setup lang="ts">
import { MapPin, Mail } from 'lucide-vue-next'
</script>