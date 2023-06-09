<template>
  <main class="daily-list">
    <h4 class="mb-4">Total Daily Calories: <b>{{ totalCalories }}</b></h4>
    <DailyListStyles :name="name">
      <div v-if="fields.length" class="daily-list-container">
        <ul class="daily-list-ul">
          <li v-for="(item, index) in items" :key="name+index">
            <div class="daily-list--timestamp">
              {{ convertTimestamp(item.timestamp) }}
            </div>

            <!--
              there is an issue with tailwind tree shaking when setting dynamic css
              to fix: https://stackoverflow.com/questions/72356953/how-to-use-dynamic-class-of-tailwindcss-like-this-in-project-of-vue3-and-vite
            -->
            <div v-for="(field, fieldIndex) in fields" :key="'updateField'+fieldIndex"
              :class="'col-span-'+field.size"
            >
              <TextField
                :placeholder="field.placeholder"
                :value="item[field.name as keyof typeof item]"
                @input="updateResolver($event, field.name, item.id)"
                :readonly="checkIfToday(item)"
              />
            </div>

            <ButtonText
              text="X"
              @click="deleteResolver(item.id)"
            />
          </li>

          <li class="daily-list--new">
            <div class="spacer"></div>

            <div v-for="(field, fieldIndex) in fields" :key="'createField'+fieldIndex"
              :class="'col-span-'+field.size"
            >
              <TextField
                :placeholder="field.placeholder"
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

import TextField from '../components/ui/TextField.vue'
import ButtonText from '../components/ui/ButtonText.vue'
import DailyListStyles from '../components/widgets/DailyListStyles.vue'

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
    TextField,
    ButtonText,
  },
  data() {
    return {
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
      //idLookup: {} as any,
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
    this.submitCreateFood = debounce(this.submitCreateFood, 3000)
  },

  methods: {
    createResolver($event: any, field: string) {
      let val = $event.target.value
      this.item[field as keyof typeof this.item] = val
      this.submitCreateFood()
    },

    submitCreateFood() {
      this.items.push(toRaw(this.item))
      this.item = new DefaultValue()
      createFood(this.items).then(r => {
        calculateCalories(this.items)
      })
    },

    updateResolver($event: any, field: string, id: any) {
      let val = $event.target.value
      let existItem = toRaw(this.items).findIndex((i: IFood) => i.id === id)
      this.items[existItem][field as keyof typeof this.item] = val

      /*
        TODO
        develop an algorithm that checks if all 
        properties (fields) are empty in a given object
        USE CASE
        to avoid user from clicking delete button.
        this will automatically delete the item if all fields are empty.
      */
      /*
      if (this.foods[existItem][field as keyof typeof this.food] === "") {
        this.idLookup[id as keyof typeof this.idLookup] = 1
        debugger
      }
      */
      updateFood(this.items)
        .then(r => {
          calculateCalories(this.items)
        })
    },

    deleteResolver(id: any) {
      let existItem = toRaw(this.items).findIndex((i: IFood) => i.id === id)
      this.items.splice(existItem, 1)

      updateFood(this.items).then(r => {
        calculateCalories(this.items)
      })
    },

    convertTimestamp(val?: number) {
      // fix: https://stackoverflow.com/a/57062363
      return new Date(val!).toLocaleString()
    },

    checkIfToday(item: any) {
      let todaysDate = new Date().toLocaleDateString()

      return new Date(item.timestamp).toLocaleDateString('en-US') === todaysDate
        ? false
        : true
    },
  },
}
</script>

<style>
input[readonly] {
  padding-top: 0;
  padding-bottom: 0;
  background-color: #181818 !important;
}
</style>