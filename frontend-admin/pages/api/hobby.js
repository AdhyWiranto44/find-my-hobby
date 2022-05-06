import axios from 'axios'
import Cookies from 'js-cookie'
import { tokenCookie } from '../../constants/cookies'


const domain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "http://localhost:8080/api/v1"
const headers = {
  "headers": {
    "Authorization": `Bearer ${Cookies.get(tokenCookie)}`
  }
}

export const getHobbies = async () => await axios.get(`${domain}/hobbies`)
export const createHobby = async (form = {}) => {
  await axios.post(`${domain}/hobbies`, form, headers)
}