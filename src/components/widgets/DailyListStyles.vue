<template>
  <div :class="name+'-block daily-list--style-scope'">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DailyList',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss">
.daily-list-container {
  @apply grid grid-cols-4;
}
.daily-list-ul {
  @apply col-span-4 mb-4;
}
.daily-list-ul li {
  @apply grid grid-cols-12;
}
.daily-list--timestamp,
.daily-list--new .spacer {
  @apply col-span-2 pt-2;
  font-size: 0.7em;
  line-height: 1;
}

.daily-list--style-scope button {
  @apply ml-3 col-span-1 text-neutral-400;
  font-weight: 800;
}

.daily-list--style-scope input[type='text'] {
  @apply text-neutral-400 w-full bg-neutral-800 border border-neutral-900 rounded;
  font-size: 0.9em;
}
</style>