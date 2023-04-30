<template>
  <input
    :placeholder="placeholder"
    type="text"
    :value="value"
    @input="update"
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
      type: [String, Number],
      default: '',
    },
  },

  methods: {
    update(event: any) {
      let value = event.target.value
      this.$emit('update', value)
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