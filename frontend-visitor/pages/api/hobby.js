import axios from 'axios';
import domain from '../../constants/domain';


export const getHobbies = async () => await axios.get(`${domain}`);
export const getHobbiesByName = async (name = "") => await axios.get(`${domain}?name=${name}`);
export const getHobbiesByCategory = async (category = "") => await axios.get(`${domain}/categories/${category}`);
export const getHobby = async (slug = "") => await axios.get(`${domain}/${slug}`);