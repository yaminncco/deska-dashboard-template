<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete account</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete your account?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose as-child>
        <Button variant="secondary">
          Cancel
        </Button>
      </DialogClose>
      <Button
        variant="destructive"
        :disabled="isLoading"
        @click="onDelete"
      >
        <Icon
          v-if="isLoading"
          name="lucide:loader-circle"
          class="text-base size-4 animate-spin"
          aria-hidden="true"
        />
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner'

defineModel<boolean>('open')

const { logout } = useAuth()
const isLoading = ref(false)

async function onDelete() {
  isLoading.value = true
  console.log('handle DELETE account')
  await sleep()
  await logout()
  toast.error('Your account has been deleted')
  return navigateTo('/auth/signin')
}
</script>
