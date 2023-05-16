import {
  ADD_FAV_PLAN,
  ALL_CATEGORY_DIETS,
  ALL_DIETS,
  CATEGORY_BLOG,
  DIET_FAVOURITE,
  GET_AFFLIATE_PRODUCT,
  GET_ALL_BLOG,
  GET_ALL_EXERCISE,
  GET_ALL_EXERCISES,
  GET_ALL_FAV_PLANS,
  GET_ALL_TAGS,
  GET_DIET_FAVOURITE,
  GET_PLANS,
  GET_PRODUCTS_BY_TYPE,
  GET_PRODUCT_TYPE,
  GET_SPECIFIC_DIETS,
  LOGIN_URL,
  UPDATE_PROFILE,
  MY_EXERCISE,
  SIGNUP_URL,
  SPECIFIC_CATEGORY_DATA,
  DELETE_USER,
  DRAWER_BODY_PARTS,
  GET_DRAWER_EXERCISE
} from "./ApisEndPoints";
import AxiosInstance from "./AxiosInstance";

//login

export const logInUser = async (email, password) => {
  const response = await AxiosInstance.post(`${LOGIN_URL}`, {
    email,
    password,
  });
  console.log("🚀 ~ file: ApiHandlers.js:32 ~ logInUser ~ response:", response)
  return response.data;
};
export const signUp = async (email, name, password) => {
  const response = await AxiosInstance.post(`${SIGNUP_URL}`, {
    email,
    name,
    password,
  });
  console.log("🚀 ~ file: ApiHandlers.js:42 ~ signUp ~ response:", response)
  return response;
};


export const updateUserProfile = async (data) => {
  console.log("🚀 ~ file: ApiHandlers.js:49 ~ updateUserProfile ~ data:", data)
  const response = await AxiosInstance.post(`${UPDATE_PROFILE}`, data);
  return response?.data;
};
export const deleteUser = async (id) => {
  const response = await AxiosInstance.delete(`${DELETE_USER}/${id}`,);
  return response?.data;
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
export const getSpecificDiet = async (dietId, userId) => {
  console.log("🚀 ~ file: ApiHandlers.js:88 ~ getSpecificDiet ~ userId:", userId)
  console.log("🚀 ~ file: ApiHandlers.js:88 ~ getSpecificDiet ~ dietId:", dietId)
  try {
    const response = await AxiosInstance.post(`${GET_SPECIFIC_DIETS}`, {
      dietId, userId
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
export const favouriteDiet = async (userId, dietId) => {
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
  try {

    const response = await AxiosInstance.post(`${GET_DIET_FAVOURITE}`, {
      userId,
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
export const GetDrawerExercise = async (id) => {
  try {
    const response = await AxiosInstance.post(`${GET_DRAWER_EXERCISE}`, {
      "_id": id,
    });
    const { status, data } = response;

    return { status, data };
  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};
export const GetExerciseDrawerBodyParts = async () => {
  try {
    const response = await AxiosInstance.get(`${DRAWER_BODY_PARTS}`);
    const { status, data } = response;
    console.log("🚀 ~ file: ApiHandlers.js:202 ~ GetExerciseDrawerBodyParts ~ response:", response)

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

  // const { status, data } = response

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
// plans api actions
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

export const addFavPlan = async (userId, dietId) => {
  try {

    const response = await AxiosInstance.post(`${ADD_FAV_PLAN}`, {
      userId: userId,
      dietId: dietId,
    });
    return response?.data
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get specific diet");
  }
};
export const getAllFavPlan = async (userId) => {
  try {

    const response = await AxiosInstance.post(`${GET_ALL_FAV_PLANS}`, {
      userId: userId,
    });
    return response?.data
  } catch (error) {
    console.error(error);
    throw new Error("");
  }
};

