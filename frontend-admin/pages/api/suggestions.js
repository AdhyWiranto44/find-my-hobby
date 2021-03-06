import axios from 'axios'
import domain from '../../constants/domain'
import headers from '../../constants/headers'


export const getSuggestions = async () => await axios.get(`${domain}/suggestions?limit=50&skip=0`, headers)
export const getSuggestionsByName = async (name = "") => await axios.get(`${domain}/suggestions?name=${name}&limit=50&skip=0`, headers)
export const getSuggestion = async (slug = "") => await axios.get(`${domain}/suggestions/${slug}`, headers)
export const createSuggestion = async (form = {}) => await axios.post(`${domain}/suggestions`, form, headers)
export const updateSuggestion = async (slug = "", form = {}) => await axios.patch(`${domain}/suggestions/${slug}`, form, headers)
export const deleteSuggestion = async (slug = "") => await axios.delete(`${domain}/suggestions/${slug}`, headers)