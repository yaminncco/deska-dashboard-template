<template>
  <AppConfigProvider>
    <div class="relative flex flex-col items-center justify-center h-dvh">
      <BackgroundDots />
      <div
        class="z-20 w-full max-w-3xl px-4 mx-auto mb-16 sm:px-6 lg:px-8"
      >
        <span
          class="font-medium leading-none text-5xl md:text-7xl lg:text-9xl text-primary-content"
        >
          {{ is404 ? 404 : 500 }}
        </span>
        <h2 class="my-2 text-2xl font-bold tracking-tight md:text-3xl">
          {{ title }}
        </h2>
        <p>{{ description }}</p>
        <div class="mt-8">
          <Button
            size="lg"
            @click="() => handleError('/')"
          >
            <Icon
              name="lucide:arrow-left"
              class="text-base size-4"
              aria-hidden="true"
            />
            Back to home page
          </Button>
        </div>
      </div>
    </div>
  </AppConfigProvider>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { error } = props

if (import.meta.dev) {
  console.error(error)
}

const is404 = error.statusCode === 404
const title = computed(() => is404 ? 'Page Not Found' : 'Internal server error')
const description = computed(() => is404 ? 'Sorry, the page you are looking for doesn\'t exist or has been moved.' : 'Oops! something went wrong.')

const handleError = (redirect = '/') => clearError({ redirect })

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
})
</script>
