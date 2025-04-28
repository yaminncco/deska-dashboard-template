<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="ring-sidebar-ring/50 transition-colors duration-200 hover:bg-sidebar-accent/50 active:bg-sidebar-accent/50 data-[state=open]:bg-sidebar-accent/50 data-[state=open]:hover:bg-accent-foreground/50 data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="flex gap-2 items-center w-full min-w-8 h-8">
              <Avatar class="size-8">
                <AvatarImage
                  :src="user.avatar"
                  :alt="user.fullName"
                />
                <AvatarFallback class="text-lg">
                  {{ getAvatarFallback(user.fullName) }}
                </AvatarFallback>
              </Avatar>
              <div
                class="truncate flex items-center justify-between transition-opacity duration-200 grow group-data-[state=collapsed]:opacity-0 group-data-[state=expanded]:opacity-100"
              >
                <div class="truncate flex flex-col flex-1 text-sm text-start">
                  <span class="truncate font-semibold text-foreground">{{ user.fullName }}</span>
                  <span class="truncate text-xs italic text-muted-foreground">{{ user.email }}</span>
                </div>
                <Icon
                  name="lucide:arrow-down-up"
                  class="text-base size-4"
                  aria-hidden="true"
                />
              </div>
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          :align="'end'"
          :side="'bottom'"
          :side-offset="4"
          class="w-(--reka-dropdown-menu-trigger-width) min-w-56"
        >
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
    </SidebarMenuItem>
  </SidebarMenu>
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
