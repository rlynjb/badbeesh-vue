<template>
  <main class="daily-list">
    <DailyListStyles name="food">
      <div v-if="fields.length" class="daily-list-container">
        <ul class="daily-list-ul">
          <li v-for="(foodItem, foodIndex) in foods" :key="'food'+foodIndex">
            <div class="daily-list--timestamp">
              {{ convertTimestamp(foodItem.timestamp) }}
            </div>

            <!--
              there is an issue with tailwind tree shaking when setting dynamic css
              to fix: https://stackoverflow.com/questions/72356953/how-to-use-dynamic-class-of-tailwindcss-like-this-in-project-of-vue3-and-vite
            -->
            <div v-for="(field, fieldIndex) in fields" :key="'updateField'+fieldIndex"
              :class="'col-span-'+field.size"
            >
              <input
                :placeholder="field.placeholder"
                type="text"
                :value="foodItem[field.name as keyof typeof foodItem]"
                @input="updateResolver($event, field.name, foodItem.id)"
              />
            </div>

            <button @click="deleteResolver(foodItem.id)">
              X
            </button>
          </li>

          <li class="daily-list--new">
            <div class="spacer"></div>

            <div v-for="(field, fieldIndex) in fields" :key="'createField'+fieldIndex"
              :class="'col-span-'+field.size"
            >
              <input
                :placeholder="field.placeholder"
                type="text"
                :value="food[field.name as keyof typeof food]"
                @input="createResolver($event, field.name)"
              />
            </div>
          </li>
        </ul>
      </div>
    </DailyListStyles>
  </main>
</template>

<script lang="ts">
// @ts-ignore
// fix https://stackoverflow.com/a/55576119
import { debounce } from 'lodash'
import { toRaw } from 'vue'
import DailyListStyles from '../slots/DailyListStyles.vue'

import {
  getFoods,
  createFood,
  updateFood,
} from '../datasources/localstorage'
import {
  type ISelfCare,
  SelfCare
} from '../models/ISelfCare'

interface IFood extends ISelfCare {
  calorie?: string
}
class Food extends SelfCare {
  public calorie: string = ''
}

export default {
  components: {
    DailyListStyles,
  },
  data() {
    return {
      //idLookup: {} as any,
      food: {} as IFood,
      foods: [] as IFood[],
      fields: [
        {
          name: 'name',
          placeholder: 'food name',
          size: '6',
        },
        {
          name: 'calorie',
          placeholder: 'calorie',
          size: '2',
        }
      ],
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