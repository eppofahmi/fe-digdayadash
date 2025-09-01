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
          <NuxtLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.href"
            :class="navItemClasses(item.active)"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        
        <!-- Auth Section -->
        <div v-if="!isLoggedIn" class="flex items-center">
          <BaseButton variant="primary" size="sm" @click="navigateTo('/login')">
            Masuk
          </BaseButton>
        </div>
        
        <div v-else class="flex items-center gap-4">
          <!-- User Info -->
          <div class="flex items-center gap-2">
            <div class="hidden md:block">
              <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
              <p class="text-xs text-gray-500 capitalize">{{ user?.role }}</p>
            </div>
          </div>
          
          <!-- Logout Button -->
          <button
            class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200"
            @click="handleLogout"
            title="Keluar"
          >
            <Power class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types'
import { Power } from 'lucide-vue-next'

const { user, isLoggedIn, logout } = useAuth()

const navItems: NavItem[] = [
  { label: 'Dasbor', href: '/', active: true },
  { label: 'Dataset', href: '/dataset', active: false },
  { label: 'Tutorial', href: '/tutorial', active: false }
]

const navItemClasses = (active?: boolean) => {
  const baseClasses = 'text-gray-600 no-underline py-2 border-b-2 border-transparent transition-colors duration-200'
  const activeClasses = 'text-[var(--primary-green)] border-[var(--primary-green)]'
  const hoverClasses = 'hover:text-[var(--primary-green)] hover:border-[var(--primary-green)] hover:border-opacity-50'
  
  return [
    baseClasses,
    active ? activeClasses : hoverClasses
  ].join(' ')
}

const handleLogout = async () => {
  await logout()
}
</script>