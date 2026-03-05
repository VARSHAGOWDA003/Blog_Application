import axios from "axios";
export const API_URL = "http://localhost:8085/api"   //where backend runs

export const getErrorMessage =(error)=>{

    return error?.response?.data?.error ? error?.response?.data?.error : "Something went Wrong";
}
//conditional rendering 
//? is optional chaining it checks if the proprrty exists before accesseing 

const apiClient = axios.create({
    baseURL:API_URL
})
//Interceptors allow you to modify requests before they are sent.
//This one runs before every API request.
apiClient.interceptors.request.use(
    (config) => { //request details
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;  
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const axiosInstance = apiClient 
//Exports the configured Axios instance.Can be used anywhere in your app.