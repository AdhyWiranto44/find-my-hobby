import axios from 'axios'
import domain from '../../constants/domain'


export const createSuggestion = async (form = "") => await axios.post(`${domain}/suggestions`, form)