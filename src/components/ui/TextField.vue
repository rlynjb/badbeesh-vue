<template>
  <input
    :placeholder="placeholder"
    type="text"
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
  },
}
</script>

<style lang="postcss" scoped>
input[type='text'] {
  @apply text-neutral-400 w-full bg-neutral-800 border border-neutral-900 rounded;
  font-size: 0.9em;
}
</style>