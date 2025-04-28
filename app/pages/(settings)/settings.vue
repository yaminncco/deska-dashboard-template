<template>
  <div class="w-full px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-6 md:mb-8 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
      <div>
        <h1 class="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
      </div>
    </div>

    <div>
      <div class="flex flex-col items-center mb-8 -mx-4 -mt-2 border-b sm:flex-row">
        <NuxtLink
          v-for="(link, index) in links"
          :key="index"
          :to="link.to"
          class="relative flex gap-2 items-center w-full px-4 py-4 font-medium transition-colors rounded-md sm:w-auto text-muted-foreground hover:text-foreground focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :exact-active-class="'text-primary-content hover:text-primary-content after:h-[2px] after:bg-primary after:absolute after:inset-x-4 after:bottom-[1px]'"
        >
          <Icon
            :name="link.icon"
            class="text-lg size-4.5 shrink-0"
            aria-hidden="true"
          />
          <span>
            {{ link.label }}
          </span>
        </NuxtLink>
      </div>
      <div>
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const links = [
  {
    label: 'General',
    icon: 'lucide:settings',
    to: '/settings',
  },
  {
    label: 'Security',
    icon: 'lucide:lock',
    to: '/settings/security',
  },
  {
    label: 'Notifications',
    icon: 'lucide:bell',
    to: '/settings/notifications',
  },
]

usePageSeoMeta({
  title: 'Settings',
})
</script>
