<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
      >
        <div class="relative flex items-center">
          <Icon
            name="lucide:bell"
            class="text-xl size-5"
            aria-hidden="true"
          />
          <span class="sr-only">Notifications</span>
          <span class="absolute inline-flex -top-2 -right-2">
            <span
              class="relative rounded-full size-2 bg-destructive"
            >
              <span class="absolute inset-0 rounded-full opacity-75 animate-ping bg-destructive" />
            </span>
          </span>
        </div>
      </Button>
    </PopoverTrigger>

    <PopoverContent
      side="bottom"
      class="p-0 min-w-72"
    >
      <div
        class="px-4 pt-3 pb-2 mb-1 text-xs font-semibold uppercase text-muted-foreground"
      >
        Notifications
      </div>
      <ScrollArea>
        <ul class="divide-y max-h-96">
          <li
            v-for="(notification, index) in notifications"
            :key="index"
          >
            <NuxtLink
              class="block px-4 py-2 transition-colors text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              @click.prevent
            >
              <span class="text-sm font-medium text-foreground">{{ notification.title }}</span>
              <span class="block mb-2 text-sm line-clamp-3">
                {{ notification.body }}
              </span>
              <span
                class="flex items-center gap-x-0.5 text-muted-foreground"
              >
                <Icon
                  name="lucide:clock"
                  class="text-sm size-3.5"
                  aria-hidden="true"
                />
                <span class="text-xs leading-tight">
                  {{ formatDistanceToNow(notification.date, { addSuffix: true }) }}
                </span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </ScrollArea>
      <div class="px-1 py-2">
        <Button
          variant="link"
          class="w-full"
        >
          View All
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup>
import { sub, formatDistanceToNow } from 'date-fns'

const notifications = [
  {
    title: 'Monthly report',
    body:
      'Cras dapibus, augue quis scelerisque ultricies, felis dolor placerat sem.',
    date: sub(new Date(), { minutes: 2 }).toISOString(),
  },
  {
    title: 'New orders',
    body: 'Nullam elit orci, condimentum vitae, accumsan quis, gravida non, velit. Morbi pellentesque accumsan elit.',
    date: sub(new Date(), { hours: 12 }).toISOString(),
  },
]
</script>
