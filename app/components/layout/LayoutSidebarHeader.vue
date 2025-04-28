<template>
  <div class="flex items-center justify-between h-(--header-height) -my-2">
    <Button
      class="group-data-[state=collapsed]:hidden group-data-[state=expanded]:hidden"
      variant="ghost"
      size="icon"
      @click="toggleSidebar"
    >
      <span class="sr-only">Close sidebar</span>
      <Icon
        name="lucide:arrow-left"
        class="text-xl size-5 rtl:rotate-180"
        aria-hidden="true"
      />
    </Button>
    <div
      class="flex group-data-[state=collapsed]:w-full"
    >
      <NuxtLink
        to="/"
        class="inline-flex w-full items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <LogoSVG class="shrink-0" />
        <span
          class="truncate grow text-xl font-semibold ms-1.5 transition-opacity duration-200 hidden group-data-[state=expanded]:block group-data-[state=collapsed]:block group-data-[state=collapsed]:opacity-0 group-data-[state=expanded]:opacity-100"
        >
          {{ $config.public.siteName || '%siteName' }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar'

const $config = useRuntimeConfig()
const { toggleSidebar } = useSidebar()
</script>
