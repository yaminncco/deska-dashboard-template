<template>
  <Sidebar
    collapsible="icon"
    :side="side"
    :variant="variant"
    :portal="{ to: `#app-sidebar-${id}` }"
    :class="[
      color === 'dark' && 'dark text-sidebar-foreground',
    ]"
    :style="color === 'accent' ? { '--sidebar': 'var(--app-sidebar-accent)' } : {}"
  >
    <SidebarHeader v-if="$slots.header">
      <slot name="header" />
    </SidebarHeader>

    <SidebarContent
      :style="{
        'scrollbar-width': 'thin',
        'scrollbar-color': 'var(--border)',
      }"
      class="overflow-x-hidden"
    >
      <AppSidebarNavGroup
        v-for="(group, i) in nav"
        :key="`main-${i}`"
        :group="group"
      />

      <template v-if="secondaryNav?.length">
        <div class="mt-auto" />
        <AppSidebarNavGroup
          v-for="(group, i) in secondaryNav"
          :key="`secondary-${i}`"
          :group="group"
        />
      </template>
    </SidebarContent>

    <SidebarFooter v-if="$slots.footer">
      <slot name="footer" />
    </SidebarFooter>
  </Sidebar>
  <Teleport to="body">
    <div
      :id="`app-sidebar-${id}`"
      :class="[color === 'dark' && 'dark']"
    />
  </Teleport>

  <div
    v-if="variant === 'inset'"
    :class="[color === 'dark' && 'dark']"
  >
    <div class="bg-(--sidebar) absolute inset-0" />
  </div>
</template>

<script setup lang="ts">
import type { SidebarProps } from '@/types/sidebar'

withDefaults(defineProps<SidebarProps>(), {
  color: 'background',
  side: 'left',
  variant: 'sidebar',
})

const id = useId()
</script>
