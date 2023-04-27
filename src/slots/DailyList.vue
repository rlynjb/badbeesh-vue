<template>
  <div class="grid grid-cols-4">
    <ul class="col-span-4 mb-4">
      <li v-for="(itemData, itemIndex) in localDailyItems" :key="'food'+itemIndex"
        class="grid grid-cols-12"
      >
        <div class="col-span-3 text-xs">
          {{ convertTimestamp(itemData.timestamp) }}
        </div>
        {{ itemData.name }}
        <div v-for="(field, fieldIndex) in fields" :key="'updateField'+fieldIndex"
          :class="'col-span-'+field.size"
        >
          <input
            class="text-black w-full"
            :placeholder="field.placeholder"
            type="text"
            :value="dailyItem[field.name as keyof typeof dailyItem]"
            @input="updateEmit($event, field.name, itemData.id)"
          />
        </div>

        <button class="ml-3 col-span-1"
          @click="deleteEmit(itemData.id)"
        >
          X
        </button>
      </li>

      <li class="grid grid-cols-12 mt-2">
        <div class="col-span-3 text-xs"></div>

        <div v-for="(field, fieldIndex) in fields" :key="'createField'+fieldIndex"
          :class="'col-span-'+field.size"
        >
          <input
            class="text-black w-full"
            :placeholder="field.placeholder"
            type="text"
            :value="dailyItem[field.name as keyof typeof dailyItem]"
            @input="createEmit($event, field.name)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { toRaw } from 'vue'

/*
  TODO:
  research how to pass typescript interface as props
*/
export default {
  name: 'DailyList',
  props: {
    fields: {
      type: Array,
      default: [],
    },
    dailyItem: {
      type: Object,
      default: {},
    },
    dailyItems: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      localDailyItem: {},
      localDailyItems: [],
    }
  },

  watch: {
    dailyItem(val) {
      this.localDailyItem = val
    },
    dailyItems(val) {
      this.localDailyItems = val
    },
  },

  methods: {
    createEmit($event: any, field: string) {
      let val = $event.target.value
      this.dailyItem[field as keyof typeof this.dailyItem] = val
      this.dailyItems.push(toRaw(this.dailyItem))
      this.dailyItem = new Food()

      this.$emit('create', this.dailyItems)
    },

    updateEmit($event: any, field: string, id: any) {
      let val = $event.target.value
      let existFood = toRaw(this.dailyItems).findIndex((i: IFood) => i.id === id)
      this.dailyItems[existFood][field as keyof typeof this.dailyItem] = val

      this.$emit('update', this.dailyItems)
    },
    deleteEmit(id: any) {
      let existFood = toRaw(this.dailyItems).findIndex((i: IFood) => i.id === id)
      this.dailyItems.splice(existFood, 1)

      this.$emit('delete', this.dailyItems)
    },

    convertTimestamp(val?: number) {
      return new Date(val).toLocaleString()
    },
  },
}
</script>