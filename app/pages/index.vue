<template>
  <div class="w-full px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-6 md:mb-8 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
      <div>
        <h1 class="text-2xl font-bold tracking-tight md:text-3xl">
          Dashboard
        </h1>
      </div>

      <div
        class="grid justify-start grid-flow-col gap-2"
      >
        <DashboardDatepicker v-model="datePickerRange" />
        <DashboardPeriodSelect
          v-model="period"
          :range="range"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <DashboardMetrics />
      </div>
      <div class="col-span-12">
        <DashboardChart
          :period="period"
          :range="range"
        />
      </div>
      <div class="col-span-12 lg:col-span-6">
        <DashboardRecentSales />
      </div>
      <div class="col-span-12 lg:col-span-6">
        <DashboardTopCountries />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DateRange } from 'reka-ui'
import { today as getToday, getLocalTimeZone } from '@internationalized/date'
import type { Period } from '~/types'

const today = getToday(getLocalTimeZone())
const startAt = today.subtract({ days: 14 })
const endAt = today

const datePickerRange = shallowRef({
  start: startAt,
  end: endAt,
}) as Ref<DateRange>

const period = ref<Period>('daily')
const range = shallowRef({ ...datePickerRange.value })

watch(datePickerRange, (v) => {
  if (v.start && v.end) {
    range.value = v
  }
})

usePageSeoMeta({
  title: 'Dashboard',
})
</script>
