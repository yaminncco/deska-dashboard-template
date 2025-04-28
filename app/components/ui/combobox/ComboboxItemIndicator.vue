<script setup lang="ts">
import type { ComboboxItemIndicatorProps } from 'reka-ui'
import { ComboboxItemIndicator, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/utils/lib/utils'

const props = defineProps<ComboboxItemIndicatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ComboboxItemIndicator
    data-slot="combobox-item-indicator"
    v-bind="forwarded"
    :class="cn('ms-auto', props.class)"
  >
    <slot />
  </ComboboxItemIndicator>
</template>
