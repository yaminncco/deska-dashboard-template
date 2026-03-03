<template>
  <SidebarProvider
    class="relative md:[&:has([data-variant=inset])_main>header]:rounded-t-xl [--header-height:66px]"
    :default-open="defaultOpen"
    :style="{
      '--app-sidebar-accent': 'color-mix(in oklab, var(--accent) 60%, var(--background))',
      ...(color === 'accent' && variant === 'inset' && {
        '--sidebar': 'var(--app-sidebar-accent)',
      }),
    }"
  >
    <LayoutSidebar
      :color="color"
      :variant="variant"
    />
    <SidebarInset
      :class="[
        'min-w-0 bg-background text-foreground',
        color !== 'accent' && 'md:peer-data-[variant=inset]:border',
      ]"
    >
      <Header />
      <div class="grow overflow-hidden">
        <slot />
      </div>
      <Footer />
    </SidebarInset>
  </SidebarProvider>
</template>

<script lang="ts" setup>
import type { SidebarProps } from '@/types/sidebar'

const defaultOpen = useCookie<boolean>('sidebar:state')

const color = ref<SidebarProps['color']>('background')
const variant = ref<SidebarProps['variant']>('sidebar')
</script>
