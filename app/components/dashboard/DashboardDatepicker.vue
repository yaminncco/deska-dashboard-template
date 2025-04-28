<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-60 justify-start font-normal',
            !value && 'text-muted-foreground',
          )
        "
      >
        <Icon
          name="lucide:calendar-range"
          class="text-base size-4 shrink-0"
          aria-hidden="true"
        />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.custom(value.start.toDate(timezone), { dateStyle: 'medium' }) }} -
            {{ df.custom(value.end.toDate(timezone), { dateStyle: 'medium' }) }}
          </template>

          <template v-else>
            {{ df.custom(value.start.toDate(timezone), { dateStyle: 'medium' }) }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        initial-focus
        :number-of-months="2"
        locale="en"
        @update:start-value="(startDate) => (value.start = startDate)"
      />
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup>
import { getLocalTimeZone } from '@internationalized/date'
import { type DateRange, useDateFormatter } from 'reka-ui'
import { cn } from '@/utils/lib/utils'

const props = defineProps<{
  modelValue: DateRange
}>()

const emit = defineEmits(['update:modelValue'])

const df = useDateFormatter('en')
const timezone = getLocalTimeZone()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
