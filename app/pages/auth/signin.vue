<template>
  <AuthTemplate>
    <div class="flex flex-col justify-center space-y-6">
      <div class="space-y-1 text-center">
        <h1 class="text-2xl font-semibold leading-none tracking-tight">
          Sign in to your account
        </h1>
        <p class="mt-1 text-muted-foreground">
          Enter the fields below to access your account
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
                  autocomplete="email"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div>
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
                    autocomplete="current-password"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="mt-1 text-sm">
              <NuxtLink
                to="/auth/reset-password"
                class="text-sm hover:underline text-primary-content"
              >
                Forget password?
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <Button
            class="w-full"
            type="submit"
            :disabled="isSubmitting || isLoading"
          >
            Sign in
            <Icon
              v-if="isLoading"
              name="lucide:loader-circle"
              class="text-base size-4 animate-spin"
              aria-hidden="true"
            />
          </Button>
        </div>
      </form>

      <div class="relative">
        <span class="text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-[1px] py-1 px-2">
          Or
        </span>
        <Separator />
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
          Sign in with Google
        </Button>
      </div>

      <div class="px-6 space-y-2 text-center">
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

const { login } = useAuth()

const testUser = {
  email: 'test123@gmail.com',
  password: 'password',
}

const isLoading = ref(false)

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
)

const { isSubmitting, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: testUser,
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await login({ email: values.email, password: values.password })
    await navigateTo('/')
  }
  catch (error: any) {
    console.log(error)
    isLoading.value = false
    toast.error(error.data?.message || error.message || 'Something went wrong')
  }
})
</script>
