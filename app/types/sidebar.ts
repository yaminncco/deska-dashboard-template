import type { NuxtLinkProps } from '#app'
import type { BadgeVariants } from '@/components/ui/badge'

export interface SidebarProps {
  nav: SidebarNavGroup[]
  secondaryNav?: SidebarNavGroup[]
  color?: 'background' | 'accent' | 'dark'
  variant?: 'sidebar' | 'floating' | 'inset'
  side?: 'left' | 'right'
}

export interface SidebarNavGroup {
  heading?: string
  items: (SidebarItem | SidebarItemGroup)[]
}

export interface SidebarItemGroup {
  title: string
  children: SidebarItem[]
  activeRoute?: string | string[]
  icon?: string
}

export interface SidebarItem {
  title: string
  link: NuxtLinkProps
  activeRoute?: string | string[]
  icon?: string
  badge?: {
    label: string
    variant?: BadgeVariants['variant']
  }
}
