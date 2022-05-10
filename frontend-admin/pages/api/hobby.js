import axios from 'axios'
import domain from '../../constants/domain'
import headers from '../../constants/headers'


export const getHobbies = async () => await axios.get(`${domain}/hobbies?limit=0&skip=0`)
export const getHobbiesByName = async (name = "") => await axios.get(`${domain}/hobbies?name=${name}&limit=0&skip=0`);
export const getHobby = async (slug = "") => await axios.get(`${domain}/hobbies/${slug}`)
export const createHobby = async (form = {}) => await axios.post(`${domain}/hobbies`, form, headers)
export const updateHobby = async (slug = "", form = {}) => await axios.patch(`${domain}/hobbies/${slug}`, form, headers)
export const deleteHobby = async (slug = "") => await axios.delete(`${domain}/hobbies/${slug}`, headers)