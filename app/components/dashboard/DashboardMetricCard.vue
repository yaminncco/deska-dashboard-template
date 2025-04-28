<template>
  <div class="group relative rounded-md has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring/50">
    <div
      class="flex flex-wrap items-center justify-between gap-2 px-4 py-4 pb-0 sm:px-6"
    >
      <div class="flex items-center gap-2">
        <Icon
          :name="icon"
          class="text-primary text-xl size-5"
          aria-hidden="true"
        />
        <component
          :is="link ? NuxtLink : 'p'"
          class="font-semibold outline-none before:absolute before:inset-0 before:z-1"
          v-bind="link ? link : null"
        >
          {{ title }}
        </component>
      </div>
      <div>
        <Icon
          name="lucide:arrow-up-right"
          class="text-lg size-4.5 text-primary transition-opacity duration-200 opacity-0 group-has-[a:hover]:opacity-100 group-has-[a:focus]:opacity-100"
          aria-hidden="true"
        />
      </div>
    </div>
    <div class="flex items-center justify-between p-4 sm:px-6">
      <div
        class="text-2xl font-bold"
      >
        <template v-if="value">
          {{ value }}
        </template>
        <Skeleton
          v-else
          class="w-[60px] h-7 rounded-sm"
        />
      </div>
      <div
        v-if="perc"
        dir="ltr"
        class="flex flex-col items-end text-sm"
      >
        <span :class="perc > 0 ? 'text-success' : 'text-destructive'">
          {{ `${perc > 0 ? '+' : ''}${perc}%` }}
        </span>
        <span
          v-if="percText"
          class="text-muted-foreground text-xs"
        >
          {{ percText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components'
import type { NuxtLinkProps } from '#app'

defineProps<{
  title: string
  icon: string
  value?: string
  link?: NuxtLinkProps
  perc?: number
  percText?: string
}>()
</script>
