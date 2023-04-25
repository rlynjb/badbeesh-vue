<script lang="ts">
export default {
  props: {
    nameVal; String,
    calorie: String
  },
  data() {
    return {

    }
  },

  methods: {
    update($event: any, field: string) {
      
    },
  },
}
</script>

<template>
  <div>
    <input
      class="text-black"
      placeholder="Food name"
      type="text"
      :value="nameVal"
      @input="update($event, 'name')"
    />
    <input
      class="text-black"
      placeholder="Calorie"
      type='text'
      :value="calorie"
      @input="update($event, 'calorie')"
    />
  </div>
</template>