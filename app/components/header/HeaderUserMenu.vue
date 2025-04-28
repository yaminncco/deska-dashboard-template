<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <div class="flex gap-1 items-center group">
        <Avatar class="size-9">
          <AvatarImage
            :src="user.avatar"
            :alt="user.fullName"
          />
          <AvatarFallback class="text-lg">
            {{ getAvatarFallback(user.fullName) }}
          </AvatarFallback>
        </Avatar>
        <div class="flex items-center transition-colors text-foreground/50 group-hover:text-foreground">
          <Icon
            name="lucide:chevron-down"
            class="text-sm size-3.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      :align="'end'"
      side="bottom"
      class="w-44"
    >
      <DropdownMenuLabel>
        <div class="font-semibold truncate text-foreground">
          {{ user.fullName }}
        </div>
        <div class="text-xs italic truncate text-muted-foreground">
          {{ user.email }}
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem as-child>
          <NuxtLink
            :to="'/settings'"
          >
            <Icon
              name="lucide:settings"
              class="text-base size-4"
              aria-hidden="true"
            />
            Settings
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <NuxtLink
            :to="'/settings/security'"
          >
            <Icon
              name="lucide:lock"
              class="text-base size-4"
              aria-hidden="true"
            />
            Security
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <NuxtLink
            :to="'/settings/notifications'"
          >
            <Icon
              name="lucide:bell"
              class="text-base size-4"
              aria-hidden="true"
            />
            Notifications
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        variant="destructive"
        @click="signOut"
      >
        <Icon
          name="lucide:log-out"
          class="text-base size-4"
          aria-hidden="true"
        />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
const { logout } = useAuth()

const user = {
  fullName: 'John Doe',
  email: 'test123@gmail.com',
  avatar: 'https://i.pravatar.cc/128?u=1',
}

async function signOut() {
  await logout()
  await navigateTo('/auth/signin')
}
</script>
