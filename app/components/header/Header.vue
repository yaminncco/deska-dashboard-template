<template>
  <header
    class="sticky top-0 z-30 overflow-hidden text-foreground before:border-border before:border-b before:bg-background/80 max-lg:shadow-sm before:absolute before:inset-0 before:backdrop-blur-md before:-z-10"
    :class="[darkMode && 'dark', (darkMode && colorMode.value !== 'dark') && 'before:!bg-background']"
  >
    <h2 class="sr-only">
      Header
    </h2>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-2 h-(--header-height)">
        <div class="flex items-center gap-x-3">
          <div>
            <Button
              variant="ghost"
              size="icon"
              @click="toggleSidebar"
            >
              <Icon
                name="lucide:panel-left"
                class="text-xl size-5"
                aria-hidden="true"
              />
              <span class="sr-only">Toggle Sidebar</span>
            </Button>
          </div>
          <HeaderSearch />
        </div>

        <div class="flex items-center gap-x-3">
          <HeaderNotifications />
          <ColorModeButton />
          <div class="h-6">
            <Separator
              :orientation="'vertical'"
            />
          </div>
          <HeaderUserMenu />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useSidebar } from '@/components/ui/sidebar'

defineProps<{
  darkMode?: boolean
}>()

const colorMode = useColorMode()
const { toggleSidebar } = useSidebar()
</script>
