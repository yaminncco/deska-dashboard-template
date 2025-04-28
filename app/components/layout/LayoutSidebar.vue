<template>
  <AppSidebar
    :nav="nav"
  >
    <template #header>
      <LayoutSidebarHeader />
    </template>
    <template #footer>
      <LayoutSidebarFooter />
    </template>
  </AppSidebar>
</template>

<script lang="ts" setup>
import type { SidebarProps } from '@/types/sidebar'

const nav: SidebarProps['nav'] = [
  {
    items: [
      {
        title: 'Dashboard',
        icon: 'lucide:house',
        link: {
          to: '/',
        },
      },
    ],
  },
  {
    heading: 'Pages',
    items: [
      {
        title: 'Settings',
        icon: 'lucide:settings',
        activeRoute: ['/settings'],
        children: [
          {
            title: 'General',
            link: {
              to: '/settings',
            },
          },
          {
            title: 'Security',
            link: {
              to: '/settings/security',
            },
          },
          {
            title: 'Notifications',
            link: {
              to: '/settings/notifications',
            },
          },
        ],
      },
    ],
  },
  {
    heading: 'More',
    items: [
      {
        title: 'Authentication',
        icon: 'lucide:lock',
        children: [
          {
            title: 'Sign in',
            link: {
              to: '/auth/signin',
            },
          },
          {
            title: 'Sign up',
            link: {
              to: '/auth/signup',
            },
          },
          {
            title: 'Forget Password',
            link: {
              to: '/auth/reset-password',
            },
          },
        ],
      },
    ],
  },
]
</script>
