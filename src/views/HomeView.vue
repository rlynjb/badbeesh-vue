<script lang="ts">
import Food from '../components/Food.vue'
import Workout from '../components/Workout.vue'

export default {
  components: {
    Food,
    Workout,
  },
}
</script>

<template>
  <main class="home-view">
    <section class="grid grid-cols-4 gap-4">
      <div class="col-span-4">
        <h3 class="subtitle">Food Diary</h3>
      </div>
      <Food class="col-span-4" />
    </section>

    <section class="grid grid-cols-4 gap-4">
      <div class="col-span-4">
        <h3 class="subtitle">Workout Diary</h3>
      </div>
      <Workout class="col-span-4" />
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
