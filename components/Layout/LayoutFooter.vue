<template>
  <footer class="text-white py-8 mt-4" style="background-color: #191718;">
    <div class="max-w-6xl mx-auto px-5">
      <!-- Top Section -->
      <div class="flex flex-col md:flex-row items-start justify-between gap-8 mb-8 pb-8 border-b border-gray-700">
        <!-- Left side - Logo -->
        <div class="flex items-center gap-4">
          <img
            src="/footerlogo.svg"
            alt="PBNU Logo"
            class="h-10 w-auto"
          >
        </div>

        <!-- Right side - Contact Info -->
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Location -->
          <div class="flex items-center gap-3">
            <MapPin class="w-5 h-5 text-gray-400" />
            <div class="text-sm">
              <p class="text-gray-300">Jl. Jatinegara Baru No.189, Jakarta 13310</p>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-center gap-3">
            <Mail class="w-5 h-5 text-gray-400" />
            <div class="text-sm">
              <p class="text-gray-300">digitalteam@mail.nu.id</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Left side - Description -->
        <div class="text-sm text-gray-400">
          <p>Dashboard resmi PBNU yang menyajikan data kepengurusan dan ekosistem NU secara terintegrasi dan akuntabel.</p>
        </div>

        <!-- Right side - Copyright -->
        <div class="text-sm text-gray-400 text-right">
          <p>Digdaya Dashboard</p>
          <p>©2025</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MapPin, Mail } from 'lucide-vue-next'
</script>