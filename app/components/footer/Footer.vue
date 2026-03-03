<template>
  <footer class="border-t shrink-0 text-muted-foreground">
    <h2 class="sr-only">
      Footer
    </h2>
    <ContainerWrapper class="py-6">
      <div class="flex flex-col text-xs">
        <div>
          © {{ $config.public.siteName || '%siteName' }} {{ currentYear }}
        </div>
        <nav class="mt-4">
          <ul
            class="flex gap-x-2"
          >
            <li>
              <NuxtLink class="hover:underline hover:text-foreground">
                Terms
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:underline hover:text-foreground">
                Privacy Policy
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </ContainerWrapper>
  </footer>
</template>

<script lang="ts" setup>
const $config = useRuntimeConfig()
const currentYear = new Date().getFullYear()
</script>
