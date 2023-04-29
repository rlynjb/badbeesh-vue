import { configDefaults } from 'vitest/config';
<template>
  <input
    :placeholder="placeholder"
    type="text"
    :value="foodItem[field.name as keyof typeof foodItem]"
    @input="updateResolver($event, field.name, foodItem.id)"
  />
</template>

<script lang="ts">
export default {
  name: 'TextField',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped>
input[type='text'] {
  @apply text-neutral-400 w-full bg-neutral-800 border border-neutral-900 rounded;
  font-size: 0.9em;
}
</style>