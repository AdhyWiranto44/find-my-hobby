import axios from 'axios'
import domain from '../../constants/domain'
import headers from '../../constants/headers'


export const getRoles = async () => await axios.get(`${domain}/roles?limit=50&skip=0`, headers)
export const getRolesByName = async (name = "") => await axios.get(`${domain}/roles?name=${name}&limit=50&skip=0`, headers)
export const getRole = async (name = "") => await axios.get(`${domain}/roles/${name}`, headers)
export const createRole = async (form = {}) => await axios.post(`${domain}/roles`, form, headers)
export const updateRole = async (slug = "", form = {}) => await axios.patch(`${domain}/roles/${slug}`, form, headers)
export const deleteRole = async (slug = "") => await axios.delete(`${domain}/roles/${slug}`, headers)