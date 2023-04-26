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
  <main class="container w-6/12">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-4">
        <h3 class="text-xl">Food diary</h3>
      </div>
      <Food class="col-span-4" />
    </div>
  </main>
</template>
