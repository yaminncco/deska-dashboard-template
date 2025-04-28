<template>
  <SidebarMenuButton
    as-child
    :tooltip="item.title"
    :is-active="isActiveRoute"
    class="transition-colors duration-200 dark:hover:bg-sidebar-accent/50 bg-linear-[135deg] rtl:bg-linear-[-135deg] data-[active=true]:text-primary-content data-[active=true]:bg-transparent data-[active=true]:from-primary/10 data-[active=true]:to-primary/5 data-[active=true]:hover:bg-transparent"
  >
    <NuxtLink
      v-bind="item.link"
      :exact-active-class="'is-active'"
      class="[.is-active]:text-primary-content [.is-active]:bg-transparent [.is-active]:from-primary/10 [.is-active]:to-primary/5 [.is-active]:hover:bg-transparent"
    >
      <Icon
        :name="item.icon || 'lucide:dot'"
        class="text-base size-4 shrink-0"
        aria-hidden="true"
      />
      <span>{{ item.title }}</span>
      <template v-if="item.badge">
        <SidebarMenuBadge class="text-current">
          <Badge
            v-if="item.badge.variant"
            :variant="item.badge.variant"
          >
            {{ item.badge.label }}
          </Badge>
          <span v-else>{{ item.badge.label }}</span>
        </SidebarMenuBadge>
      </template>
    </NuxtLink>
  </SidebarMenuButton>
</template>

<script lang="ts" setup>
import type { SidebarItem } from '@/types/sidebar'

const props = defineProps<{
  item: SidebarItem
}>()

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value)

const isActiveRoute = computed(() => {
  const activeRoute = props.item.activeRoute
  if (!activeRoute) return false
  const match = (route: string) => currentRoute.value.fullPath.includes(route)
  return Array.isArray(activeRoute)
    ? activeRoute.some(match)
    : match(activeRoute)
})
</script>
