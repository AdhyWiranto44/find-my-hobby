import axios from 'axios'
import domain from '../../constants/domain'
import headers from '../../constants/headers'
import headersMultipartFormData from '../../constants/headersMultipartFormData';


export const getHobbies = async () => await axios.get(`${domain}/hobbies?limit=50&skip=0`)
export const getHobbiesByName = async (name = "") => await axios.get(`${domain}/hobbies?name=${name}&limit=50&skip=0`);
export const getHobby = async (slug = "") => await axios.get(`${domain}/hobbies/${slug}`)
export const createHobby = async (form = {}) => await axios.post(`${domain}/hobbies`, form, headersMultipartFormData)
export const updateHobby = async (slug = "", form = {}) => await axios.patch(`${domain}/hobbies/${slug}`, form, headers)
export const deleteHobby = async (slug = "") => await axios.delete(`${domain}/hobbies/${slug}`, headers)