import axios from 'axios';
import domain from '../../constants/domain';


export const getHobbies = async () => await axios.get(`${domain}/hobbies?limit=0&skip=0`);
export const getHobbiesByName = async (name = "") => await axios.get(`${domain}/hobbies?name=${name}&limit=0&skip=0`);
export const getHobbiesByCategory = async (category = "") => await axios.get(`${domain}/hobbies/categories/${category}`);
export const getHobby = async (slug = "") => await axios.get(`${domain}/hobbies/${slug}`);