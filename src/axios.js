import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_ULR_API,
});

// console.log('Axios instance baseURL:', instance.defaults.baseURL);

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
// console.log('Axios instance baseURL:', instance.defaults.baseURL);
export default instance;
