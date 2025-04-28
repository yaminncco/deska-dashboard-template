<template>
  <DashboardCard
    :title="'Top Countries'"
    :description="'Last 7 days.'"
    :icon="'lucide:globe'"
  >
    <div class="space-y-0.5">
      <template v-if="data.length">
        <div
          v-for="(country, index) in data"
          :key="index"
          class="py-1.5"
        >
          <div class="flex gap-1 items-center justify-between mb-1 text-sm">
            <div
              class="flex items-center gap-x-0.5"
            >
              <span>
                {{ getFlag(country.countryCode) }}
              </span>
              <span class="font-medium">{{ country.label }}</span>
            </div>
            <span class="text-muted-foreground">{{ country.value }}%</span>
          </div>
          <Progress
            :model-value="country.value"
            :style="{ '--progress-percentage': `${country.value}%` }"
            class="mt-1 h-2 rounded-md [&>div]:animate-progress rtl:-scale-x-100"
          />
        </div>
      </template>
      <template v-else>
        <div
          v-for="i in 3"
          :key="i"
          class="px-4 py-4"
        >
          <Skeleton
            class="w-full h-5 rounded-sm"
          />
        </div>
      </template>
    </div>
  </DashboardCard>
</template>

<script setup lang="ts">
const countries = [
  {
    label: 'China',
    countryCode: 'CN',
    value: 64,
  },
  {
    label: 'Indonesia',
    countryCode: 'ID',
    value: 29,
  },
  {
    label: 'Russia',
    countryCode: 'RU',
    value: 17,
  },
  {
    label: 'Philippines',
    countryCode: 'PH',
    value: 16,
  },
  {
    label: 'Poland',
    countryCode: 'PL',
    value: 13,
  },
  {
    label: 'Brazil',
    countryCode: 'BR',
    value: 12,
  },
  {
    label: 'Sweden',
    countryCode: 'SE',
    value: 10,
  },
  {
    label: 'Portugal',
    countryCode: 'PT',
    value: 10,
  },
]

const { data, execute } = useAsyncData(async () => {
  await sleep(500)
  return countries
}, {
  default: () => [],
  immediate: false,
})

onMounted(() => {
  execute()
})
</script>
