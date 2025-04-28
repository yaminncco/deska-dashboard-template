<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import { type HTMLAttributes, toValue } from 'vue'
import { useFormField } from './useFormField'
import { cn } from '@/utils/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { name, formMessageId } = useFormField()
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    data-slot="form-message"
    as="p"
    :name="toValue(name)"
    :class="cn('text-destructive text-sm', props.class)"
  />
</template>
