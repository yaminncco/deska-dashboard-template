<template>
  <div class="p-2 text-white border-black rounded-md shadow-sm bg-black/80 min-w-40">
    <p class="font-semibold">
      {{ formatDate(title as unknown as Date)[period] }}
    </p>
    <div class="space-y-0.5">
      <div
        v-for="(item, key) in data"
        :key="key"
        class="flex items-center justify-between"
      >
        <div class="me-2">
          <span
            class="inline-block rounded-full size-2"
            :style="{ backgroundColor: item.color }"
          />
          {{ item.name }}:
        </div>
        <div>
          {{ formatCurrency(item.value) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Period } from '~/types'

defineProps<{
  title: string
  data: {
    name: string
    color: string
    value: any
  }[]
  period: Period
}>()
</script>
