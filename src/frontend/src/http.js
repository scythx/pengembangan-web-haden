import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    withCredentials: true
})

export default instance
