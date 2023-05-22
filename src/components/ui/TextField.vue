<template>
  <input
    :placeholder="placeholder"
    type="text"
    :readonly="readonly"
  />
</template>

<script lang="ts">

export default {
  name: 'TextField',
  props: {
    placeholder: {
      type: String,
      default: 'field name',
    },
    readonly: {
      type: Boolean,
      default: () => false
    }
  },
}
</script>

<style lang="postcss" scoped>
input[type='text'] {
  @apply text-neutral-400 w-full bg-neutral-800 border border-neutral-900 rounded;
  font-size: 0.9em;
  min-height: 2em;
}
input[readonly] {
  cursor: auto;
}
</style>