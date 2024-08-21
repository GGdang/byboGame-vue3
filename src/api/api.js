import axios, { AxiosInstance, AxiosResponse, isAxiosError } from 'axios'

export const baseURL = `http://20.189.118.35:8080`
// Create a new Axios instance
const instance = axios.create({
  baseURL,
  timeout: 60 * 1000
})

// Set up an interceptor to intercept all requests
instance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    // Handle errors when an error occurs before sending the request
    return error
  }
)

// Set up an interceptor to intercept all responses
instance.interceptors.response.use(
  (response) => {
    // After receiving the response, the response can be modified
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
