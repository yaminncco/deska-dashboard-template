<template>
  <ClientOnly v-if="!colorMode?.forced">
    <Button
      variant="ghost"
      size="icon"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      @click="isDark = !isDark"
    >
      <span class="size-9 items-center justify-center inline-flex dark:hidden">
        <Icon
          name="lucide:moon-star"
          class="text-lg"
          aria-hidden="true"
        />
      </span>
      <span class="size-9 items-center justify-center hidden dark:inline-flex">
        <Icon
          name="lucide:sun"
          class="text-lg"
          aria-hidden="true"
        />
      </span>
    </Button>
    <template #fallback>
      <div class="size-9" />
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>
