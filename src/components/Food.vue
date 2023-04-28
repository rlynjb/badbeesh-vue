<template>
  <main class="daily-list">
    <h4 class="mb-4">Total Daily Calories: <b>{{ totalCalories }}</b></h4>
    <DailyListStyles :name="name">
      <div v-if="fields.length" class="daily-list-container">
        <ul class="daily-list-ul">
          <li v-for="(foodItem, foodIndex) in items" :key="'food'+foodIndex">
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
                :value="item[field.name as keyof typeof item]"
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
  type ISelfCare,
  SelfCare
} from '../models/ISelfCare'
import { useTotalDailyCalorie } from '../composables/useTotalDailyCalorie'

import {
  getFoods,
  createFood,
  updateFood,
} from '../datasources/localstorage'

interface IFood extends ISelfCare {
  calorie?: string
}
class DefaultValue extends SelfCare {
  public calorie: string = ''
}

let { calculateCalories, totalCalories } = useTotalDailyCalorie()

export default {
  components: {
    DailyListStyles,
  },
  data() {
    return {
      //idLookup: {} as any,
      name: 'food',
      item: {} as IFood,
      items: [] as IFood[],
      fields: [
        {
          name: 'name',
          placeholder: 'food name',
          size: '6',
        },
        {
          name: 'calorie',
          placeholder: 'calorie',
          size: '3',
        }
      ],
    }
  },

  computed: {
    totalCalories() {
      return totalCalories.value
    }
  },

  mounted() {
    this.item = new DefaultValue()

    getFoods().then(res => {
      this.items = res
      calculateCalories(this.items)
    })

    // ref: https://stackoverflow.com/a/75374781
    this.createResolver = debounce(this.createResolver, 3000)
  },

  methods: {
    createResolver($event: any, field: string) {
      let val = $event.target.value
      this.item[field as keyof typeof this.item] = val
      this.items.push(toRaw(this.item))
      this.item = new DefaultValue()

      createFood(this.items)
    },

    updateResolver($event: any, field: string, id: any) {
      let val = $event.target.value
      let existFood = toRaw(this.items).findIndex((i: IFood) => i.id === id)
      this.items[existFood][field as keyof typeof this.item] = val

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
      
      updateFood(this.items)
        .then(r => calculateCalories(this.items))
    },

    deleteResolver(id: any) {
      let existFood = toRaw(this.items).findIndex((i: IFood) => i.id === id)
      this.items.splice(existFood, 1)

      updateFood(this.items)
    },

    convertTimestamp(val?: number) {
      // fix: https://stackoverflow.com/a/57062363
      return new Date(val!).toLocaleString()
    },
  },
}
</script>