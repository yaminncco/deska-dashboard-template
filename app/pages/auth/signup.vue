<template>
  <AuthTemplate>
    <div class="flex flex-col justify-center space-y-6">
      <div class="space-y-1 text-center">
        <h1 class="text-2xl font-semibold leading-none tracking-tight">
          Create your account
        </h1>
        <p class="mt-1 text-muted-foreground">
          Sign up to get started
        </p>
      </div>

      <div class="space-y-2">
        <Button
          class="w-full"
          variant="outline"
        >
          <Icon
            name="logos:google-icon"
            mode="svg"
            aria-hidden="true"
          />
          Sign up with Google
        </Button>
      </div>

      <div class="relative">
        <span class="text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-[1px] py-1 px-2">
          Or
        </span>
        <Separator />
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
                  autocomplete="email"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="password"
          >
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  autocomplete="new-password"
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
            :disabled="isSubmitting || isLoading"
          >
            Sign up with email
            <Icon
              v-if="isLoading"
              name="lucide:loader-circle"
              class="text-base size-4 animate-spin"
              aria-hidden="true"
            />
          </Button>
        </div>
      </form>

      <div class="px-6 text-center">
        <p class="text-xs text-muted-foreground">
          By creating an account, you agree to our
          <NuxtLink class="underline underline-offset-4 hover:text-foreground">
            Terms of Service
          </NuxtLink>
          and
          <NuxtLink class="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
          </NuxtLink>
        </p>
      </div>

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
      </div>
    </div>
  </AuthTemplate>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

definePageMeta({
  layout: 'blank',
  // for demonstration purpose we use public instead of guest
  public: true,
})

const isLoading = ref(false)

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email(),
      password: z.string(),
    }),
)

const { isSubmitting, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log('handle SIGNUP', values)
})
</script>
