<script lang="ts">
import { toRaw } from 'vue'
// @ts-ignore
// fix https://stackoverflow.com/a/55576119
import { debounce } from 'lodash'

import {
  type ISelfCare,
  SelfCare
} from '../models/ISelfCare'
import {
  getFoods,
  createFood,
  updateFood,
} from '../datasources/localstorage'


interface IFood extends ISelfCare {
  calorie?: string
}
class Food extends SelfCare {
  public calorie: string = ''
}

export default {
  data() {
    return {
      food: {} as IFood,
      foods: [] as IFood[],
      idLookup: {} as any,
    }
  },

  mounted() {
    this.food = new Food()

    getFoods().then(res => {
      this.foods = res
    })

    // ref: https://stackoverflow.com/a/75374781
    this.createResolver = debounce(this.createResolver, 3000)
  },

  methods: {
    createResolver($event: any, field: string) {
      let val = $event.target.value
      this.food[field as keyof typeof this.food] = val
  
      this.foods.push(toRaw(this.food))
      this.food = new Food()

      createFood(this.foods)
    },

    updateResolver($event: any, field: string, id: any) {
      let val = $event.target.value
      let existFood = toRaw(this.foods).findIndex((i: IFood) => i.id === id)
      this.foods[existFood][field as keyof typeof this.food] = val

      /*
        TODO
        develop an algorithm that checks if all 
        properties (fields) are empty in a given object
        USE CASE
        to avoid user from clicking delete button.
        this will automatically delete the item if all fields are empty.
      */
      /*
      if (this.foods[existFood][field as keyof typeof this.food] === "") {
        this.idLookup[id as keyof typeof this.idLookup] = 1
        debugger
      }
      */
      
      updateFood(this.foods)
    },

    deleteResolver(id: any) {
      let existFood = toRaw(this.foods).findIndex((i: IFood) => i.id === id)
      this.foods.splice(existFood, 1)

      updateFood(this.foods)
    },

    convertTimestamp(val?: number) {
      return new Date(val).toLocaleString()
    },
  },
}
</script>

<template>
  <main class="grid grid-cols-4">
    <ul class="col-span-4 mb-4">
      <li v-for="(foodItem, foodIndex) in foods" :key="'food'+foodIndex"
        class="grid grid-cols-12"
      >
        <div class="col-span-3 text-xs">
          {{ convertTimestamp(foodItem.timestamp) }}
        </div>
        <!-- move this to its own composable or component -->
        <input
          class="text-black col-span-4"
          placeholder="Food name"
          type="text"
          :value="foodItem.name"
          @input="updateResolver($event, 'name', foodItem.id)"
        />
        <input
          class="text-black col-span-4"
          placeholder="Calorie"
          type='text'
          :value="foodItem.calorie"
          @input="updateResolver($event, 'calorie', foodItem.id)"
        />
        <button class="ml-3 col-span-1"
          @click="deleteResolver(foodItem.id)"
        >
          X
        </button>
      </li>

      <li class="grid grid-cols-12 mt-2">
        <div class="col-span-3 text-xs">
        </div>
        <input
          class="text-black col-span-4"
          placeholder="Food name"
          type="text"
          :value="food.name"
          @input="createResolver($event, 'name')"
        />
        <input
          class="text-black col-span-4"
          placeholder="Calorie"
          type='text'
          :value="food.calorie"
          @input="createResolver($event, 'calorie')"
        />
      </li>
    </ul>

  </main>
</template>
