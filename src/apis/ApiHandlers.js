import {
  ALL_CATEGORY_DIETS,
  ALL_DIETS,
  CATEGORY_BLOG,
  DIET_FAVOURITE,
  GET_AFFLIATE_PRODUCT,
  GET_ALL_BLOG,
  GET_ALL_EXERCISE,
  GET_ALL_EXERCISES,
  GET_ALL_TAGS,
  GET_DIET_FAVOURITE,
  GET_PLANS,
  GET_PRODUCTS_BY_TYPE,
  GET_PRODUCT_TYPE,
  GET_SPECIFIC_DIETS,
  LOGIN_URL,
  MY_EXERCISE,
  SIGNUP_URL,
  SPECIFIC_CATEGORY_DATA
} from "./ApisEndPoints";
import AxiosInstance from "./AxiosInstance";

//login
export const loginUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    return await AxiosInstance.post(`${LOGIN_URL}`, {
      email,
      password,
    });

  })
};


// all exercises
export const GetAllExercise = async () => {
  try {
    const response = await AxiosInstance.post(`${GET_ALL_EXERCISE}`, {
      fullName,
      email,
    });
    if (response.status === 201) {
      alert(` You have created: ${JSON.stringify(response.data)}`);
      setIsLoading(false);
      setFullName("");
      setEmail("");
    } else {
      throw new Error("An error has occurred");
    }
  } catch (error) {
    alert("An error has occurred");
    setIsLoading(false);
  }
};
export const AllCategoryDiets = async () => {
  try {
    const response = await AxiosInstance.post(`${ALL_CATEGORY_DIETS}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get specific diet");
  }
};
//  diets
export const getSpecificDiet = async (id) => {
  try {

    const response = await AxiosInstance.post(`${GET_SPECIFIC_DIETS}`, {
      _id: id,
    });
    return response
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get specific diet");
  }
};
export const getSpecificCategoryData = async (id) => {
  try {

    const response = await AxiosInstance.post(`${SPECIFIC_CATEGORY_DATA}`, {
      _id: id,
    });
    return response
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get specific diet");
  }
};
export const setFavouriteDiet = async (userId, dietId) => {
  try {

    const response = await AxiosInstance.post(`${DIET_FAVOURITE}`, {
      userId: userId,
      dietId: dietId,
    });
    return response?.data
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get specific diet");
  }
};
export const getFavouriteDiets = async (userId) => {
  console.log("🚀 ~ file: ApiHandlers.js:100 ~ getFavouriteDiets ~ userId:", userId)
  try {

    const response = await AxiosInstance.post(`${GET_DIET_FAVOURITE}`, {
      userId: '641442d3a09d72d4d2e2411c',
    });
    return response?.data
  } catch (error) {
    console.error(error);
    throw new Error("");
  }
};


// home page exercise/
export const getAllExercises = async () => {
  try {
    const response = await AxiosInstance.get(`${GET_ALL_EXERCISES}`);
    return response;

  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};
export const MyExercise = async (id) => {
  try {
    const response = await AxiosInstance.get(`${MY_EXERCISE}`);
    const { status, data } = response;
    return { status, data };
  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};

// blog page posts/
export const getAllBlog = async () => {
  try {
    const response = await AxiosInstance.get(`${GET_ALL_BLOG}`);
    const { data } = response;
    return { data };
  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};


export const GetAffliateProduct = async () => {

  let response = await AxiosInstance.get(`${GET_AFFLIATE_PRODUCT}`)

  const { status, data } = response

  return { status, data }

}
export const GetAllDiets = async () => {

  let response = await AxiosInstance.get(`${ALL_DIETS}`)

  const { status, data } = response

  return { status, data }

}

// blog .....
export const getAllTags = async () => {
  try {
    const response = await AxiosInstance.get(`${GET_ALL_TAGS}`);
    return response?.data;

  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};

export const categoryBlog = async (id) => {
  try {

    const response = await AxiosInstance.post(`${CATEGORY_BLOG}`, {
      tagId: id,
    });
    return response.data
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get specific diet");
  }
};
export const getProductsByType = async (id) => {
  try {

    const response = await AxiosInstance.post(`${GET_PRODUCTS_BY_TYPE}`, {
      typeId: id,
    });
    return response.data
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get specific diet");
  }
};
export const getProductType = async () => {
  try {
    const response = await AxiosInstance.get(`${GET_PRODUCT_TYPE}`);
    return response;

  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};
export const getPlans = async () => {
  try {
    const response = await AxiosInstance.get(`${GET_PLANS}`);
    return response;

  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};
