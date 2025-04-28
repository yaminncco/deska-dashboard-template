<template>
  <div class="space-y-10 divide-y *:pb-6 *:last:pb-0">
    <div class="grid items-center grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
      <div class="self-start">
        <h2 class="text-lg font-semibold">
          Theme
        </h2>
        <p class="mt-1 text-foreground/80">
          Choose the look of your dashboard.
        </p>
      </div>
      <div class="md:col-span-2">
        <ColorModeSelect />
      </div>
    </div>

    <div class="grid items-center grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
      <div class="self-start">
        <h2 class="text-lg font-semibold">
          Profile
        </h2>
        <p class="mt-1 text-foreground/80">
          Update your profile settings.
        </p>
      </div>
      <div class="md:col-span-2 space-y-6">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <div class="flex shrink-0 items-center">
              <input
                ref="avatarInputRef"
                type="file"
                name="avatar"
                :multiple="false"
                accept=".jpg, .jpeg, .png"
                class="hidden"
                @change="handleAvatarChange"
              >
              <div class="relative inline-flex items-center gap-2 group">
                <div class="relative inline-flex">
                  <Avatar class="size-20 bg-input/30 border border-input">
                    <AvatarImage
                      :src="user.avatar.src || ''"
                      :alt="'Avatar'"
                    />
                  </Avatar>
                  <div
                    class="absolute inset-0 inline-flex items-center justify-center transition-opacity rounded-full opacity-0 bg-secondary/80 text-secondary-foreground group-hover:opacity-100"
                  >
                    <Icon
                      name="lucide:camera"
                      class="text-xl size-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  @click="openFileDialog"
                >
                  <span class="absolute inset-0" />
                  {{ user.avatar.src ? 'Change Image' : 'Upload Image' }}
                </Button>
              </div>
            </div>
            <Button
              v-if="user.avatar.src"
              type="button"
              variant="outline"
              @click="handleRemoveAvatar"
            >
              <Icon
                name="lucide:x"
                class="text-base size-4"
                aria-hidden="true"
              />
              Remove
            </Button>
          </div>
        </div>

        <form
          @submit="onSubmit"
        >
          <div class="space-y-4">
            <FormField
              v-slot="{ componentField }"
              name="fullName"
            >
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ componentField }"
              name="email"
            >
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ componentField }"
              name="username"
            >
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ componentField }"
              name="bio"
            >
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" />
                </FormControl>
                <FormDescription>
                  Brief description for your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="mt-6">
            <Button
              type="submit"
              variant="secondary"
              :disabled="isSubmitting || isLoading"
            >
              <Icon
                name="lucide:user-round-check"
                class="text-base size-4"
                aria-hidden="true"
              />
              Save Changes
              <Icon
                v-if="isLoading"
                name="lucide:loader-circle"
                class="text-base size-4 animate-spin"
                aria-hidden="true"
              />
            </Button>
          </div>
        </form>
      </div>
    </div>

    <div class="grid items-center grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
      <div class="self-start">
        <h2 class="text-lg font-semibold">
          Danger zone
        </h2>
        <p class="mt-1 text-foreground/80">
          Irreversible and destructive actions
        </p>
      </div>
      <div class="md:col-span-2">
        <h3 class="text-sm font-medium leading-none">
          Delete account
        </h3>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <div class="mt-6">
          <Dialog v-model:open="isDeleteAccountDialogOpen">
            <DialogTrigger as-child>
              <Button variant="destructive">
                <Icon
                  name="lucide:circle-alert"
                  class="text-base size-4"
                  aria-hidden="true"
                />
                Delete account
              </Button>
              <SettingsDeleteAccountDialog
                v-model:open="isDeleteAccountDialogOpen"
              />
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

const isDeleteAccountDialogOpen = ref(false)
const isLoading = ref(false)
const avatarInputRef = ref<HTMLInputElement | null>(null)

const user = reactive({
  fullName: 'John Doe',
  email: 'test123@gmail.com',
  username: 'johndoe',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=1',
  },
  bio: '',
})

const { avatar, ...initialValues } = user

const formSchema = toTypedSchema(
  z
    .object({
      fullName: z.string(),
      email: z.string().email(),
      username: z.string(),
      bio: z.string(),
    }),
)

const { isSubmitting, handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues,
})

const onSubmit = handleSubmit(async (values) => {
  console.log('handle UPDATE account', values)
  isLoading.value = true
  await sleep()

  isLoading.value = false
  resetForm()
  toast.success('Profile updated')
})

function handleAvatarChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.length && target.files[0]) {
    user.avatar.src = URL.createObjectURL(target.files[0])
  }
}

function handleRemoveAvatar() {
  user.avatar.src = ''
}

function openFileDialog() {
  avatarInputRef.value?.click()
}
</script>
