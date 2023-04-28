<template>
  
</template>

<script lang="ts">
import { toRaw } from 'vue'

export default {
  data() {
    return {
      totalCalories: 0,
      items: [] as object[]
    }
  },

  methods: {
    calculateDailyCalories() {
      let todaysDate = new Date().toLocaleDateString()
      let totalCalories = 0;

      let filterFoodsByDate = toRaw(this.items)
        .filter((r: any) => {
          return new Date(r.timestamp).toLocaleDateString('en-US') === todaysDate
        })
        .forEach((r: any) => {
          totalCalories += parseInt(r.calorie)
        })

      this.totalCalories = totalCalories
    },
  },
}
</script>

<style lang="postcss">

</style>