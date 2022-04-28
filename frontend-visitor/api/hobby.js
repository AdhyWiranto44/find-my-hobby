import axios from 'axios';

const url = "http://localhost:8080/api/v1/hobbies";

export const getHobbies = async () => await axios.get(`${url}`);
export const getHobby = async (slug = "") => await axios.get(`${url}/${slug}`);