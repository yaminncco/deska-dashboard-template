<template>
  <AuthTemplate>
    <template v-if="!submitted">
      <div
        class="flex flex-col justify-center space-y-6"
      >
        <div class="space-y-1 text-center">
          <h1 class="text-2xl font-semibold leading-none tracking-tight">
            Forgot your password?
          </h1>
          <p class="mt-1 text-muted-foreground">
            Enter your email below to reset your password
          </p>
        </div>

        <form
          @submit="onSubmit"
        >
          <div class="space-y-3">
            <FormField
              v-slot="{ componentField }"
              name="email"
            >
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    autocomplete="off"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="mt-6">
            <Button
              class="w-full"
              type="submit"
            >
              Send reset link
            </Button>
          </div>
        </form>

        <div class="px-6 space-y-2 text-center">
          <p class="text-sm font-medium">
            Already have an account?
            <NuxtLink
              to="/auth/signin"
              class="hover:underline text-primary-content"
            >
              Sign in
            </NuxtLink>
          </p>
          <p class="text-sm font-medium">
            Don't have an account?
            <NuxtLink
              to="/auth/signup"
              class="hover:underline text-primary-content"
            >
              Create an account
            </NuxtLink>
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold leading-none tracking-tight">
          Password reset link sent
        </h1>
        <p class="mt-2 text-sm text-muted-foreground">
          The link to reset your password have been sent to your email address. Please follow the instructions provided.
        </p>
      </div>
    </template>
  </AuthTemplate>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'blank',
  // for demonstration purpose we use public instead of guest
  public: true,
})

const submitted = ref(false)

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email(),
    }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log('handle RESET password', values)
  submitted.value = true
  toast('Password reset email has been sent.')
})
</script>
