import axios from 'axios'
import domain from '../../constants/domain'
import headers from '../../constants/headers'
import { decode } from 'jsonwebtoken'


export const getUsers = async () => {
  let response = await axios.get(`${domain}/users?limit=0&skip=0`, headers)
  let users = [...response.data.data.users]
  users = await filterByUserLogin(users)
  response.data.data.users = users
  response.data.data.total--

  return response
}
export const getUsersByUsername = async (username = "") => {
  let response = await axios.get(`${domain}/users?username=${username}&limit=0&skip=0`, headers)
  let users = [...response.data.data.users]
  users = await filterByUserLogin(users)
  response.data.data.users = users
  response.data.data.total--

  return response
}
export const getUser = async (username = "") => await axios.get(`${domain}/users/${username}`)
export const createUser = async (form = {}) => await axios.post(`${domain}/users`, form, headers)
export const updateUser = async (username = "", form = {}) => await axios.patch(`${domain}/users/${username}`, form, headers)
export const deleteUser = async (username = "") => await axios.delete(`${domain}/users/${username}`, headers)

const filterByUserLogin = async (users) => {
  users = await users.filter(user => {
    let userLogin = decode(headers.headers.Authorization.split(" ")[1], process.env.NEXT_PUBLIC_SECRET)
    userLogin = userLogin.username
    return user.username != userLogin
  })

  return users
}