<template>
  <div
    class="relative flex flex-col items-center justify-center h-dvh"
  >
    <BackgroundDots />
    <div class="absolute inset-x-0 top-0 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-2 h-(--header-height)">
        <div />
        <div class="flex gap-1">
          <ColorModeButton />
        </div>
      </div>
    </div>
    <div class="relative z-20 flex flex-col w-full max-w-md">
      <div class="flex items-center mx-auto mb-6">
        <LogoSVG />
        <span class="text-xl font-semibold ms-1.5 text-foreground">{{ $config.public.siteName || '%siteName' }}</span>
      </div>
      <div
        class="w-full px-4 py-6 border rounded-md shadow-md bg-background"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const $config = useRuntimeConfig()
</script>
