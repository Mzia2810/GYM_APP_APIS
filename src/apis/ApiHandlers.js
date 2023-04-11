import { GET_ALL_EXERCISE, LOGIN_URL, MY_EXERCISE,GET_SPECIFIC_EXERCISE } from "./ApisEndPoints";
import AxiosInstance from "./AxiosInstance";

//login
export const loginUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let data = JSON.stringify({
      email,
      password,
    });
    return await AxiosInstance.post(`${LOGIN_URL}`, data);
  });
  //   let response = await AxiosInstance.post(`${LOGIN_URL}`, {
  //     email,
  //     password,
  //   });
  //   console.log("Response login ======> : ", response);
  //   console.log("Response email ======> : ", email);
  //   console.log("Response password ======> : ", password);
  //   const { status, data } = response;
  //   return { status, data };
};

// all exercises

// const Get_All_Exercise = async (_id) => {
//   try {
//     let data = JSON.stringify({
//       _id
//     });
//     const result = await AxiosInstance.post(`${GET_ALL_EXERCISE}`, data);
//     if (result.status >= 200 && result.status < 300) {
//       setAllExerciseData(result.data)
      
//       // console.log('this is my all exercises ====>  ',result.data.exercises);
//     }
//   } catch (error) {
//     console.error("Error during All Exercise ==>:", error);
//   }
// };


// get specific exercise 

// export const GetSpecificExercise = async (_id) => {
//   try {
//     let data = JSON.stringify({
//       _id
//     });
//     const result = await AxiosInstance.post(`${GET_SPECIFIC_EXERCISE}`, data);
//     if (result.status >= 200 && result.status < 300) {
//       // setAllExerciseData(result.data)
      
//       console.log('this is my all exercises ====>  ',result.data);
//     }
//   } catch (error) {
//     console.error("Error during All Exercise ==>:", error);
//   }
// };

// home page exercise
export const MyExercise = async (id) => {
  try {
    const response = await AxiosInstance.get(`${MY_EXERCISE}?id=${id}`);
    const { status, data } = response;
    return { status, data };
  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    const message = data.message || "Something went wrong.";
    throw new Error(message);
  }
};
