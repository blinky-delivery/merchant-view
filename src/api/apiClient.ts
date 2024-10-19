import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter';



console.log(import.meta.env.VITE_API_URL)
const apiClient = applyCaseMiddleware(axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
}))

export default apiClient