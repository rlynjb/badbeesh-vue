export const getFoods = async () => {
  let data = await localStorage.getItem("food")
  return data ? JSON.parse(data) : []
}

export const createFood = async (payload?: object[]) => {
  return await localStorage.setItem("food", JSON.stringify(payload))
}

export const updateFood = async (payload: object[]) => {
  return await localStorage.setItem("food", JSON.stringify(payload))
}