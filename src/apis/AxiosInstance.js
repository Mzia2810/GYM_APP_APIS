import axios from "axios";
import { Alert } from "react-native";

const AxiosInstance = axios.create({
  baseURL: "https://wb-best-fit.herokuapp.com/api/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

//Now handle response

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // let token = store
    // if(token){
    //     config.headers.Authorization=`Bearer ${token}`
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    error?.response?.message && typeof error.response.message ==='string' && Alert.alert(`${error.response.message}`)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default AxiosInstance