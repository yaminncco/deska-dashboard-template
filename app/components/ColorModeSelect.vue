<template>
  <ClientOnly v-if="!colorMode?.forced">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline">
          <Icon
            :name="preference.icon"
            class="text-base size-4"
            aria-hidden="true"
          />
          <span>
            {{ preference.label }}
          </span>
          <Icon
            name="lucide:chevron-down"
            class="text-sm size-3.5"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup v-model="selected">
          <DropdownMenuRadioItem
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
          >
            <Icon
              :name="option.icon"
              class="text-base size-4"
              aria-hidden="true"
            />
            {{ option.label }}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <template #fallback>
      <Button
        variant="outline"
        disabled
      >
        <Icon
          :name="fallback.icon"
          class="text-base size-4"
          aria-hidden="true"
        />
        <span>
          {{ fallback.label }}
        </span>
        <Icon
          name="lucide:chevron-down"
          class="text-sm size-3.5"
          aria-hidden="true"
        />
      </Button>
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()

const options = [
  { label: 'System', value: 'system', icon: 'lucide:monitor' },
  { label: 'Light', value: 'light', icon: 'lucide:sun' },
  { label: 'Dark', value: 'dark', icon: 'lucide:moon-star' },
]
const fallback = options[0]!

const selected = computed({
  get() {
    return preference.value.value
  },
  set(option) {
    colorMode.preference = option
  },
})

const preference = computed(() => {
  return options.find(option => option.value === colorMode.preference) || fallback
})
</script>
