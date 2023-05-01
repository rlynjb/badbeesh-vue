<template>
  <button>
    {{ text }}
  </button>
</template>

<script lang="ts">
export default {
  name: 'ButtonText',
  props: {
    text: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped>

</style>