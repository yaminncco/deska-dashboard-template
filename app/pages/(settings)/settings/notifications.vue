<template>
  <div class="space-y-10 divide-y *:pb-6 *:last:pb-0">
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="grid items-center grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3"
    >
      <div class="self-start">
        <h2 class="text-lg font-semibold">
          {{ section.title }}
        </h2>
        <p class="mt-1 text-foreground/80">
          {{ section.description }}
        </p>
      </div>
      <div class="md:col-span-2">
        <div
          class="bg-background p-4 border rounded-md space-y-4 divide-y *:pb-4 *:last:pb-0"
        >
          <div
            v-for="field in section.fields"
            :key="field.name"
            :name="field.name"
          >
            <div class="flex flex-row items-center justify-between">
              <div class="space-y-0.5">
                <Label
                  :for="`switch-${field.name}`"
                >
                  {{ field.label }}
                </Label>
                <p class="text-sm text-muted-foreground">
                  {{ field.description }}
                </p>
              </div>
              <div>
                <Switch
                  :id="`switch-${field.name}`"
                  v-model="state[field.name]"
                  @update:model-value="onChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const state = reactive<{ [key: string]: boolean }>({
  news_updates: true,
  important_updates: true,
  mobile: true,
  desktop: false,
})

const sections = [
  {
    title: 'Email notifications',
    description: 'Receive the latest news and updates.',
    fields: [
      {
        name: 'news_updates',
        label: 'News and updates',
        description: 'Receive a weekly news.',
      },
      {
        name: 'important_updates',
        label: 'Important updates',
        description:
          'Receive important updates.',
      },
    ],
  },
  {
    title: 'Push notifications',
    description: 'Decide where you like to receive notifications',
    fields: [
      {
        name: 'mobile',
        label: 'Mobile',
        description: 'Receive notifications via your mobile app.',
      },
      {
        name: 'desktop',
        label: 'Desktop',
        description: 'Receive notifications via your desktop app.',
      },
    ],
  },
]

async function onChange() {
  console.log('handle UPDATE notifications', state)
}
</script>
