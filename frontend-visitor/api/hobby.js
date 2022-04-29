import axios from 'axios';

const url = "http://localhost:8080/api/v1/hobbies";

export const getHobbies = async () => await axios.get(`${url}`);
export const getHobbiesByName = async (name = "") => await axios.get(`${url}?name=${name}`);
export const getHobbiesByCategory = async (category = "") => await axios.get(`${url}/categories/${category}`);
export const getHobby = async (slug = "") => await axios.get(`${url}/${slug}`);