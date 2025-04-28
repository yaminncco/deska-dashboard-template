<template>
  <div v-if="status === 'pending' && !data.length">
    <DashboardChartSkeleton />
  </div>
  <div
    v-else
    class="relative"
  >
    <ProgressIndeterminate
      v-if="status === 'pending'"
      class="absolute"
    />
    <DashboardChartCard>
      <template #header>
        <div>
          <p class="mb-1 text-sm font-medium text-muted-foreground">
            Revenue
          </p>
          <p class="text-3xl font-semibold">
            {{ formatCurrency(total) }}
          </p>
        </div>
      </template>
      <AreaChart
        :data="data"
        index="date"
        :categories="['amount']"
        :x-formatter="xTicksFormatter"
        :custom-tooltip="customTooltip({ period })"
        :show-y-axis="false"
        :show-legend="false"
      />
    </DashboardChartCard>
  </div>
</template>

<script lang="ts" setup>
import type { DateRange } from 'reka-ui'
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
} from 'date-fns'
import { getLocalTimeZone } from '@internationalized/date'
import DashboardChartTooltip from './DashboardChartTooltip.vue'
import type { Period } from '~/types'

interface DataRecord {
  date: Date
  amount: number
}

const props = defineProps<{
  period: Period
  range: DateRange
}>()

const startDateRange = computed(() => {
  if (!props.range.start) return null
  return props.range.start.toDate(getLocalTimeZone())
})

const endDateRange = computed(() => {
  if (!props.range.end) return null
  return props.range.end.toDate(getLocalTimeZone())
})

const { data, status, execute } = await useAsyncData<DataRecord[]>(
  async () => {
    await sleep(1000)
    return generateRandomData(startDateRange.value, endDateRange.value, props.period)
  },
  {
    default: () => [],
    immediate: false,
  },
)

const total = computed(() =>
  data.value.reduce((acc: number, { amount }) => acc + amount, 0),
)

const customTooltip = (props: any) => {
  return h(DashboardChartTooltip, props)
}

const xTicksFormatter = (_i: number | Date) => {
  const i = _i as number
  if (i === 0 || i === data.value.length - 1 || !data.value[i]) {
    return ''
  }
  return formatDate(data.value[i].date)[props.period]
}

const generateRandomData = (start: Date | null, end: Date | null, period: Period): DataRecord[] => {
  if (!start || !end) return []
  const dates = {
    daily: eachDayOfInterval,
    weekly: eachWeekOfInterval,
    monthly: eachMonthOfInterval,
  }[period]({
    start,
    end,
  })

  return dates.map(date => ({
    date,
    amount: Math.floor(Math.random() * 2000) + 500,
  }))
}

watch([() => props.period, () => props.range], () => {
  execute()
}, { immediate: true })
</script>
