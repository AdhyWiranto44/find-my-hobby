import axios from 'axios'

const domain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "http://localhost:8080/api/v1"
export const getSuggestions = () => axios.get(`${domain}/suggestions`)