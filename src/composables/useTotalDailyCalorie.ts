import {
  ref,
  onMounted, onUnmounted,
  toRaw
} from 'vue'

export function useTotalDailyCalorie() {
  let totalCalories = ref(0)

  const calculateCalories = (items: object[] = []) => {
    let todaysDate = new Date().toLocaleDateString()

    totalCalories.value = 0

    return toRaw(items)
      .filter((r: any) => {
        return new Date(r.timestamp).toLocaleDateString('en-US') === todaysDate
      })
      .forEach((r: any) => {
        totalCalories.value += parseInt(r.calorie)
      })
  }

  return {
    totalCalories,
    calculateCalories,
  }
}