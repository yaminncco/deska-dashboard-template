<template>
  <AppConfigProvider>
    <NuxtLoadingIndicator :color="'var(--primary)'" />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in',
        }"
      />
    </NuxtLayout>
    <ClientOnly>
      <Toaster
        :theme="colorMode.value === 'dark' ? 'dark' : 'light'"
        rich-colors
      />
    </ClientOnly>
  </AppConfigProvider>
</template>

<script lang="ts" setup>
const $config = useRuntimeConfig()
const { title, description } = useAppConfig()
const ogImage = `${$config.public.siteUrl}/og-banner.png`

const colorMode = useColorMode()

useSeoMeta({
  title,
  ogTitle: () => title || $config.public.siteName || undefined,
  ogType: 'website',
  ogUrl: () => $config.public.siteUrl || undefined,
  description,
  ogDescription: description,
  ogImage,
  twitterTitle: () => title || $config.public.siteName || undefined,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterCard: 'summary_large_image',
})
</script>
