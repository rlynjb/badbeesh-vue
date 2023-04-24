<script lang="ts">
import { nanoid } from 'nanoid'
import { toRaw } from 'vue'

interface IFood {
  id: string,
  timestamp: string,
  name: string,
  calorie: string
}

export default {
  data() {
    return {
      food: {} as IFood,
      foods: [] as IFood[],
    }
  },

  methods: {
    update($event: any, field: string) {
      let val:string = $event.target.value

      let findItem = this.foods.findIndex((i: IFood) => i.id === this.food.id)

      // find item and update
      if (findItem < -1) {
        this.foods[findItem][field as keyof typeof this.food] = val
      } else {
        // create new item
        this.food[field as keyof typeof this.food] = val
        this.foods.push(toRaw(this.food))
      }

      console.log(this.foods)

      // find item in foods
      // if exist, update existing item
      // if not exist, create new item
      // if all fields are empty, remove item
    },
    delete() {},
  },
}
</script>

<template>
  <main class="p-4">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-4">
        <h3 class="text-xl">Food diary</h3>
      </div>

      <input
        class="col-span-2"
        placeholder="Food name"
        type="text"
        :value="food.name"
        @input="update($event, 'name')"
      />

      <input
        class="col-span-2"
        placeholder="Calorie"
        type='text'
        :value="food.calorie"
        @input="update($event, 'calorie')"
      />
    </div>
  </main>
</template>
