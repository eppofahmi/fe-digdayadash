<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <!-- Header -->
        <thead>
          <tr class="bg-gray-50">
            <th
              v-for="col in columns"
              :key="col"
              class="px-2 sm:px-4 py-2 sm:py-4 text-left border-b border-gray-200"
            >
              <BaseSkeleton :width="col" height="0.875rem" />
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <tr
            v-for="row in rows"
            :key="row"
            class="border-b border-gray-200"
          >
            <td
              v-for="col in columns"
              :key="`${row}-${col}`"
              class="px-2 sm:px-4 py-2 sm:py-4"
            >
              <BaseSkeleton :width="col" height="0.875rem" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination skeleton -->
    <div class="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
      <div class="flex items-center gap-2 sm:gap-4">
        <BaseSkeleton width="50px" height="2rem" variant="rounded" />
        <BaseSkeleton width="120px" height="0.875rem" />
      </div>

      <div class="flex items-center gap-2">
        <BaseSkeleton width="40px" height="2rem" variant="rounded" />
        <BaseSkeleton width="40px" height="2rem" variant="rounded" />
        <BaseSkeleton width="40px" height="2rem" variant="rounded" />
        <BaseSkeleton width="40px" height="2rem" variant="rounded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rows?: number
  columns?: string[]
}

withDefaults(defineProps<Props>(), {
  rows: 5,
  columns: () => ['80px', '150px', '100px', '120px', '100px', '80px']
})
</script>
