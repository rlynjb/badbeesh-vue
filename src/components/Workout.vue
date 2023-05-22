<template>
  <main class="daily-list">
    <DailyListStyles :name="name">
      <div v-if="fields.length" class="daily-list-container">
        <ul class="daily-list-ul">
          <li v-for="(item, index) in items" :key="name+index">
            <div class="daily-list--timestamp">
              {{ convertTimestamp(item.timestamp) }}
            </div>

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

import {
  getWorkouts,
  createWorkout,
  updateWorkout,
} from '../datasources/localstorage'

interface IWorkout extends ISelfCare {
  set?: string
  rep?: string
}
class DefaultValue extends SelfCare {
  public set: string = ''
  public rep: string = ''
}

export default {
  components: {
    DailyListStyles,
    TextField,
    ButtonText,
  },
  data() {
    return {
      name: 'workout',
      item: {} as IWorkout,
      items: [] as IWorkout[],
      fields: [
        {
          name: 'name',
          placeholder: 'workout name',
          size: '5',
        },
        {
          name: 'set',
          placeholder: 'set',
          size: '2',
        },
        {
          name: 'rep',
          placeholder: 'rep',
          size: '2',
        }
      ],
    }
  },

  mounted() {
    this.item = new DefaultValue()

    getWorkouts().then(res => {
      this.items = res
    })

    // ref: https://stackoverflow.com/a/75374781
    this.submitCreateWorkout = debounce(this.submitCreateWorkout, 3000)
  },

  methods: {
    createResolver($event: any, field: string) {
      let val = $event.target.value
      this.item[field as keyof typeof this.item] = val
      this.submitCreateWorkout()
    },

    submitCreateWorkout() {
      this.items.push(toRaw(this.item))
      this.item = new DefaultValue()
      createWorkout(this.items)
    },

    updateResolver($event: any, field: string, id: any) {
      let val = $event.target.value
      let existItem = toRaw(this.items).findIndex((i: IWorkout) => i.id === id)
      this.items[existItem][field as keyof typeof this.item] = val

      updateWorkout(this.items)
    },

    deleteResolver(id: any) {
      let existItem = toRaw(this.items).findIndex((i: IWorkout) => i.id === id)
      this.items.splice(existItem, 1)

      updateWorkout(this.items)
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