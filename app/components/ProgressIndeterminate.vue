<template>
  <div :class="cn('w-full h-[4px] overflow-hidden rounded-md [--indicator:25%]', props.class)">
    <div class="w-full h-full animate-indeterminate-progress bg-size-[200%_100%] bg-position-[0%] bg-[linear-gradient(90deg,var(--primary)_calc(var(--indicator)/2),transparent_calc(var(--indicator)/2))]" />
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
