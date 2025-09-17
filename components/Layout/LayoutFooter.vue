<template>
  <footer class="text-white relative overflow-hidden" style="background: linear-gradient(85.31deg, #292D32 3.07%, #003317 98.98%); border-left: 1px solid transparent; padding: 64px 64px 32px 64px;">
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
      <div class="flex flex-col md:flex-row" style="gap: 32px; opacity: 1;">
        <!-- Logo and Description - Takes 45% width -->
        <div class="w-full md:w-[45%]">
          <img
            src="/footer-logo2.svg"
            alt="PBNU Logo"
            class="h-12 w-auto mb-4"
          >
          <p class="text-gray-300 text-xs leading-4">
            <span class="font-bold">Digdaya Dashboard</span> adalah pusat kendali data Nahdlatul Ulama yang menghadirkan integrasi, pengelolaan, dan visualisasi data dalam satu sistem terpadu untuk mendukung transparansi, kolaborasi, dan transformasi digital NU.
          </p>
        </div>

        <!-- Content Sections - Takes 55% width -->
        <div class="w-full md:w-[55%] flex flex-row justify-end items-start p-0 flex-none order-1 self-stretch flex-grow-0" style="gap: 32px; opacity: 1;">
          <!-- Navigation Column -->
          <div class="w-auto">
            <h3 class="text-white mb-2 text-xs font-bold leading-4">Navigasi</h3>
            <ul>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Beranda</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Tentang</a></li>
            </ul>
          </div>

          <!-- Support Column -->
          <div class="w-auto">
            <h3 class="text-white mb-2 text-xs font-bold leading-4">Pusat Bantuan</h3>
            <ul>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Kebijakan Privasi</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Syarat dan Ketentuan</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Hubungi Kami</a></li>
            </ul>
          </div>

          <!-- Ecosystem Column -->
          <div class="w-auto">
            <h3 class="text-white mb-2 text-xs font-bold leading-4">Ekosistem</h3>
            <ul>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Digdaya</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Digdaya Persuratan</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Digdaya Kepengurusan</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Digdaya Kader</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Digdaya Pesantren</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">NU.ID</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-xs leading-4">Git NU</a></li>
            </ul>
          </div>

          <!-- Contact Info Column -->
          <div class="w-auto">
            <div class="space-y-2">
              <div class="flex items-start gap-2">
                <MapPin class="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div class="text-gray-300 text-xs leading-4">
                  <p class="font-bold">Gedung PBNU</p>
                  <p>Jl. Kramat Raya No.164, RT.7/RW.2, Kenari, Senen, Central Jakarta City, Jakarta 10110</p>
                  <p>Telepon: (021) 31923033</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <Mail class="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div class="text-gray-300 text-xs leading-4">
                  <p class="font-bold">Email</p>
                  <p>digitalteam@mail.nu.id</p>
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