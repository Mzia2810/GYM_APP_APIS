import { GER_ALL_EXERCISE, LOGIN_URL, MY_EXERCISE, GET_AFFLIATE_PRODUCT } from "./ApisEndPoints"
import AxiosInstance from "./AxiosInstance"

export const loginUser = async (email, password) => {

  let response = await AxiosInstance.post(LOGIN_URL, {
    email,
    password
  })

  const { status, data } = response

  return { status, data }

}
export const GetAllExercise = async (id) => {

  let response = await AxiosInstance.post(`${GER_ALL_EXERCISE}?id=${id}`)

  const { status, data } = response

  return { status, data }

}

export const MyExercise = async (id) => {
  try {
    const response = await AxiosInstance.get(`${MY_EXERCISE}?id=${id}`)
    const { status, data } = response
    return { status, data }
  } catch (error) {
    const { response } = error
    const { status, data } = response
    const message = data.message || "Something went wrong."
    throw new Error(message)
  }
}


export const GetAffliateProduct = async () => {

  let response = await AxiosInstance.get(`${GET_AFFLIATE_PRODUCT}`)

  const { status, data } = response

  return { status, data }

}