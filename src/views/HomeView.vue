<script lang="ts">
import { nanoid } from 'nanoid'
import { toRaw } from 'vue'
// @ts-ignore
// fix https://stackoverflow.com/a/55576119
import { debounce } from 'lodash'
//import Food from '../components/Food'


interface IFood {
  id?: string,
  timestamp?: number,
  name?: string,
  calorie?: string,
}
class FoodBase implements IFood {
  public id: string = nanoid()
  public timestamp: number = Date.now()
  public name: string = ''
  public calorie: string = ''
}
class Food extends FoodBase {}

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

    this.getData()

    // ref: https://stackoverflow.com/a/75374781
    this.postData = debounce(this.postData, 3000)
  },

  methods: {
    create($event: any, field: string) {
      let val = $event.target.value
      this.food[field as keyof typeof this.food] = val
      this.postData()
    },

    update($event: any, field: string, id?: string) {
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
      
      this.updateData()
    },

    getData() {
      let data = localStorage.getItem("food")
      if (data) {
        this.foods = JSON.parse(data)
      }
    },

    postData() {
      this.foods.push(toRaw(this.food))
      this.food = new Food()

      localStorage.setItem("food", JSON.stringify(this.foods))
    },

    updateData() {
      // replace localstorage item with new array
      localStorage.removeItem("food")
      localStorage.setItem("food", JSON.stringify(this.foods))
    },

    deleteData(id: string) {
      let existFood = toRaw(this.foods).findIndex((i: IFood) => i.id === id)
      this.foods.splice(existFood, 1)

      this.updateData()
    },
  },
}
</script>

<template>
  <main class="p-4">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-4">
        <h3 class="text-xl">Food diary</h3>
      </div>

      <ul class="col-span-4">
        <li v-for="(foodItem, foodIndex) in foods" :key="'food'+foodIndex">
          <div class="col-span-4">
            <!-- move this to its own composable or component -->
            <input
              class="text-black"
              placeholder="Food name"
              type="text"
              :value="foodItem.name"
              @input="update($event, 'name', foodItem.id)"
            />
            <input
              class="text-black"
              placeholder="Calorie"
              type='text'
              :value="foodItem.calorie"
              @input="update($event, 'calorie', foodItem.id)"
            />
            <button class="ml-3"
              @click="deleteData(foodItem.id)"
            >
              X
            </button>
          </div>
        </li>
      </ul>

      <div class="col-span-4">
        <input
          class="text-black"
          placeholder="Food name"
          type="text"
          :value="food.name"
          @input="create($event, 'name')"
        />
        <input
          class="text-black"
          placeholder="Calorie"
          type='text'
          :value="food.calorie"
          @input="create($event, 'calorie')"
        />
      </div>
    </div>
  </main>
</template>
