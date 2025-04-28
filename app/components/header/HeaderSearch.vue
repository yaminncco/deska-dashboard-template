<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button
        variant="ghost"
        class="h-auto p-0 hover:lg:bg-transparent"
        aria-label="Search"
        @click="isOpen = true"
      >
        <div
          class="inline-flex items-center justify-center size-9 lg:hidden"
        >
          <Icon
            name="lucide:search"
            class="text-xl size-5"
            aria-hidden="true"
          />
        </div>
        <div class="relative items-center justify-start hidden w-full h-10 px-4 py-2 text-sm font-normal transition-colors border rounded-md border-input bg-background hover:bg-accent/40 hover:text-accent-foreground lg:flex text-muted-foreground sm:pe-12 md:w-40 lg:w-64">
          <span>Search...</span>
          <kbd class="pointer-events-none absolute end-[0.3rem] top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded-md border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
            <span class="text-xs">⌘</span>K
          </kbd>
        </div>
      </Button>
    </DialogTrigger>
    <DialogContent
      class="p-0"
      :aria-describedby="undefined"
    >
      <DialogTitle class="sr-only">
        Search
      </DialogTitle>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          <CommandGroup
            v-for="(group, index) in commandList"
            :key="index"
            :heading="group.heading"
          >
            <CommandItem
              v-for="(item, k) in group.items"
              :key="k"
              :value="item.value"
              class="py-3"
              @select="handleSelectLink(item)"
            >
              <Icon
                :name="item.icon"
                class="text-base size-4"
                aria-hidden="true"
              />
              {{ item.value }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
interface CommandItem {
  heading: string
  items: {
    value: string
    icon: string
    to: string
    external?: boolean
  }[]
}

const commandList: CommandItem[] = [
  {
    heading: 'Pages',
    items: [
      {
        value: 'Dashboard',
        icon: 'lucide:house',
        to: '/',
      },
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        value: 'General',
        icon: 'lucide:settings',
        to: '/settings',
      },
      {
        value: 'Security',
        icon: 'lucide:lock',
        to: '/settings/security',
      },
      {
        value: 'Notifications',
        icon: 'lucide:bell',
        to: '/settings/notifications',
      },
    ],
  },
]

const isOpen = ref(false)

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  },
})

async function handleSelectLink(item: CommandItem['items'][number]) {
  await navigateTo(item.to, {
    ...(item.external && {
      open: {
        target: '_blank',
      },
    }),
  })

  isOpen.value = false
}

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1])
    isOpen.value = true
})
</script>
