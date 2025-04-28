<template>
  <Collapsible
    v-model:open="collapse"
    :default-open="isActiveRoute"
    :class="[
      'group/collapsible rounded-md',
      isActiveRoute && 'bg-linear-[135deg] rtl:bg-linear-[-135deg] from-primary/10 to-primary/5',
    ]"
  >
    <CollapsibleTrigger as-child>
      <SidebarMenuButton
        class="transition-colors duration-200 dark:hover:bg-sidebar-accent/50 data-[state=open]:bg-transparent data-[active=true]:text-primary-content! data-[active=true]:bg-transparent!"
        :tooltip="item.title"
        :is-active="isActiveRoute"
        @click="handleClick"
      >
        <Icon
          :name="item.icon || 'lucide:dot'"
          class="text-base size-4 shrink-0"
          aria-hidden="true"
        />
        <span>{{ item.title }}</span>
        <Icon
          name="lucide:chevron-right"
          class="text-sm size-3.5 ms-auto transition-[transform_opacity] duration-200 opacity-50 group-hover/collapsible:opacity-100 group-data-[state=open]/collapsible:rotate-90 rtl:-scale-x-100 group-data-[state=open]/collapsible:rtl:-rotate-90"
          aria-hidden="true"
        />
      </SidebarMenuButton>
    </CollapsibleTrigger>
    <CollapsibleContent class="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
      <SidebarMenuSub
        :class="[
          'border-border',
          isActiveRoute && 'border-primary/10',
        ]"
      >
        <SidebarMenuSubItem
          v-for="(subLink, k) in item.children"
          :key="k"
        >
          <SidebarMenuButton as-child>
            <NuxtLink
              class="text-sidebar-foreground/80 bg-transparent! [.is-active]:text-primary-content"
              :exact-active-class="'is-active'"
              v-bind="subLink.link"
            >
              <Icon
                v-if="subLink.icon"
                :name="subLink.icon"
                class="text-base size-4 shrink-0"
                aria-hidden="true"
              />
              <span>{{ subLink.title }}</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </CollapsibleContent>
  </Collapsible>
</template>

<script lang="ts" setup>
import type { SidebarItemGroup } from '@/types/sidebar'
import { useSidebar } from '@/components/ui/sidebar'

const props = defineProps<{
  item: SidebarItemGroup
}>()

const { state, open } = useSidebar()
const collapse = ref<boolean>()
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

function handleClick(_e: Event) {
  if (state.value === 'collapsed') {
    open.value = true
    nextTick(() => {
      collapse.value = true
    })
  }
}
</script>
