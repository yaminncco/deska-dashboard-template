<template>
  <div
    :class="cn([
      container ? container === 'centered' && 'max-w-7xl' : 'xl:container-centered:max-w-7xl',
      'mx-auto w-full px-4 py-8 sm:px-6 lg:px-8',
    ], props.class)"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/lib/utils'

const props = defineProps<{
  container?: 'fluid' | 'centered'
  class?: HTMLAttributes['class']
}>()
</script>
