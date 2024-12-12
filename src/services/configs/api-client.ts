import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VUE_APP_API_SERVER_URL,

  validateStatus: (status) => status < 500,

  headers: {
    'Content-Type': 'application/json',
  },
})
