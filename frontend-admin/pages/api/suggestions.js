import axios from 'axios'
import domain from '../../constants/domain'
import headers from '../../constants/headers'


export const getSuggestions = async () => await axios.get(`${domain}/suggestions`, headers)