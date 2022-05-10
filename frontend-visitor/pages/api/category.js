import axios from 'axios';
import domain from '../../constants/domain';


export const getCategories = async () => await axios.get(`${domain}/categories?limit=0&skip=0`);