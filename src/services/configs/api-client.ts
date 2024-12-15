import axios from 'axios'
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
})
