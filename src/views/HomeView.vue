<script lang="ts">
import Food from '../components/Food.vue'

export default {
  components: {
    Food
  },
  data() {
    return {
    }
  },

  methods: {

  },
}
</script>

<template>
  <main class="home-view">
    <section class="grid grid-cols-4 gap-4">
      <div class="col-span-4">
        <h3 class="subtitle">Food diary</h3>
      </div>
      <Food class="col-span-4" />
    </section>
  </main>
</template>

<style lang="postcss" scoped>
.home-view {
  @apply container;
}
.home-view section {
  @apply mb-4 p-4 border border-neutral-700 rounded;
}
.home-view .subtitle {
  @apply text-xl mb-4;
}
</style>
