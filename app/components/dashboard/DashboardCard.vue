<template>
  <Card class="h-full">
    <CardHeader>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-start gap-4">
          <div class="size-12 inline-flex items-center justify-center rounded-md bg-primary/10">
            <Icon
              :name="icon"
              class="text-primary text-2xl"
              aria-hidden="true"
            />
          </div>
          <div>
            <p class="font-semibold">
              {{ title }}
            </p>
            <div class="mt-0.5 text-sm text-muted-foreground">
              {{ description }}
            </div>
          </div>
        </div>
        <div />
      </div>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  icon: string
}>()
</script>
