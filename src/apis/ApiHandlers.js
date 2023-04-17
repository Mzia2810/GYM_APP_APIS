import {
  ALL_DIETS,
  DRAWER_BODY_PARTS,
  GET_AFFLIATE_PRODUCT,
  GET_ALL_EXERCISE,
  GET_GOALS,
  GET_SPECIFIC_DIETS,
  LOGIN_URL,
  MY_EXERCISE,
  SIGNUP_URL,
} from "./ApisEndPoints";
import AxiosInstance from "./AxiosInstance";

//login
export const loginUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    return await AxiosInstance.post(`${LOGIN_URL}`, {
      email,
      password,
    });
  });
};


export const getSpecificDiet = async (id) => {
  console.log("🚀 ~ file: ApiHandlers.js:37 ~ getSpecificDiet ~ id:", id);
  const response = await AxiosInstance.post(`${GET_SPECIFIC_DIETS}?_id=${id}`);
  console.log(
    "🚀 ~ file: ApiHandlers.js:40 ~ getSpecificDiet ~ response:",
    response
  );

  return response?.diets;
};

// GEt goals home page exercise
export const MyExercise = async (id) => {
  try {
    const response = await AxiosInstance.get(`${GET_GOALS}?id=${id}`);
    const { status, data } = response;
    return { status, data };
  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};



// GEt goals Drawer exercise category
export const GetAllExerciseCategory = async (id) => {
  try {
    const response = await AxiosInstance.get(`${GET_ALL_EXERCISE}?id=${id}`);
    const { status, data } = response;
    console.log("get goals drawer exercise category =========> :", data);

    return { status, data };
  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};
// GEt goals Drawer exercise 
export const GetExerciseDrawerBodyParts = async (id) => {
  try {
    const response = await AxiosInstance.get(`${DRAWER_BODY_PARTS}?id=${id}`);
    const { status, data } = response;

    return { status, data };
  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};




export const GetAffliateProduct = async () => {
  let response = await AxiosInstance.get(`${GET_AFFLIATE_PRODUCT}`);

  const { status, data } = response;

  return { status, data };
};
export const GetAllDiets = async () => {
  let response = await AxiosInstance.get(`${ALL_DIETS}`);

  const { status, data } = response;

  return { status, data };
};
