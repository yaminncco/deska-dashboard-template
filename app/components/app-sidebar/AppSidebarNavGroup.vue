<template>
  <SidebarGroup>
    <SidebarGroupLabel v-if="group.heading">
      {{ group.heading }}
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem
          v-for="(item, i) in group.items"
          :key="i"
        >
          <template v-if="'children' in item">
            <AppSidebarItemGroup :item="item" />
          </template>
          <template v-else>
            <AppSidebarItemButton :item="item" />
          </template>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>

<script lang="ts" setup>
import type { SidebarNavGroup } from '~/types/sidebar'

defineProps<{
  group: SidebarNavGroup
}>()
</script>
