<template>
  <div class="space-y-10 divide-y *:pb-6 *:last:pb-0">
    <div class="grid items-center grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
      <div class="self-start">
        <h2 class="text-lg font-semibold">
          Change password
        </h2>
        <p class="mt-1 text-foreground/80">
          Modify your current password
        </p>
      </div>
      <div class="md:col-span-2">
        <form
          @submit="onSubmit"
        >
          <input
            hidden
            type="text"
            name="email"
            autocomplete="email"
            value="test123@gmail.com"
          >
          <div class="space-y-4">
            <FormField
              v-slot="{ componentField }"
              name="password_current"
            >
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Current password"
                    autocomplete="current-password"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="grid gap-4 xs:grid-cols-2">
              <FormField
                v-slot="{ componentField }"
                name="password_new"
              >
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      autocomplete="new-password"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField
                v-slot="{ componentField }"
                name="password_confirm"
              >
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      autocomplete="new-password"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
          <div class="mt-6">
            <Button
              type="submit"
              variant="secondary"
              :disabled="isSubmitting || isLoading"
            >
              Update
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

    <div>
      <div class="lg:max-w-3xl">
        <h2 class="text-lg font-semibold">
          Two-steps verification
        </h2>
        <div class="mt-1 text-foreground/80">
          <p>Two factor authentication is not enabled yet.</p>
          <p>
            Two-factor authentication adds an additional layer of security to
            your account by requiring more than just a password to log in.
            <a
              href="#"
              class="underline text-primary-content"
            >Learn more</a>.
          </p>
        </div>
        <div class="mt-6">
          <Button> Enable 2FA </Button>
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

const isLoading = ref(false)

const formSchema = toTypedSchema(
  z.object({
    password_current: z.string(),
    password_new: z.string().min(8),
    password_confirm: z.string(),
  }).refine(data => data.password_new === data.password_confirm, {
    message: 'Passwords must match.',
    path: ['password_confirm'],
  }),
)

const { isSubmitting, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  console.log('handle UPDATE password', values)
  isLoading.value = true
  await sleep()

  isLoading.value = false
  toast.success('Password updated')
})
</script>
