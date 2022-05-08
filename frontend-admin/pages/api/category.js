import axios from 'axios'
import domain from '../../constants/domain'
import headers from '../../constants/headers'


export const getCategories = () => axios.get(`${domain}/categories`)
export const getCategoriesByName = async (name = "") => await axios.get(`${domain}/categories?name=${name}`)
export const getCategory = async (slug = "") => await axios.get(`${domain}/categories/${slug}`)
export const createCategory = async (form = {}) => await axios.post(`${domain}/categories`, form, headers)
export const updateCategory = async (slug = "", form = {}) => await axios.patch(`${domain}/categories/${slug}`, form, headers)
export const deleteCategory = async (slug = "") => await axios.delete(`${domain}/categories/${slug}`, headers)