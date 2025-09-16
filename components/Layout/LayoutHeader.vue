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
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types'

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
</script>