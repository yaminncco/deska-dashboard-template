<template>
  <Select v-model="value">
    <SelectTrigger class="w-[100px]">
      <SelectValue class="capitalize" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="p in periods"
          :key="p"
          :value="p"
          class="capitalize"
        >
          {{ p }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script lang="ts" setup>
import { eachDayOfInterval } from 'date-fns'
import type { DateRange } from 'reka-ui'
import { getLocalTimeZone } from '@internationalized/date'
import type { Period } from '~/types'

const props = defineProps<{
  modelValue: Period
  range: DateRange
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const days = computed(() => {
  if (!props.range.start || !props.range.end) return []
  const timezone = getLocalTimeZone()
  return eachDayOfInterval({
    start: props.range.start.toDate(timezone),
    end: props.range.end.toDate(timezone),
  })
})

const periods = computed<Period[]>(() => {
  if (days.value.length <= 8) {
    return ['daily']
  }

  if (days.value.length <= 31) {
    return ['daily', 'weekly']
  }

  return ['weekly', 'monthly']
})

watch(periods, () => {
  if (!periods.value.includes(value.value)) {
    value.value = periods.value[0]!
  }
})
</script>
