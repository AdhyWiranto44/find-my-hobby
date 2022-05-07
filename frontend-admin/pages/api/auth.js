import axios from 'axios'
import domain from '../../constants/domain'


export const login = (form) => axios.post(`${domain}/login`, form)