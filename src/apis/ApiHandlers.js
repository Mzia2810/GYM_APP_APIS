import { GET_ALL_EXERCISE, LOGIN_URL, MY_EXERCISE } from "./ApisEndPoints";
import AxiosInstance from "./AxiosInstance";

//login
export const loginUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    return await AxiosInstance.post(`${LOGIN_URL}`, {
      email,
      password,
    });

  })
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
export const GetAllExercise = async (id) => {
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
