import axios from 'axios';

const url = `${"https://findmyhobby.herokuapp.com" || "http://localhost:8080"}/api/v1/categories`;

export const getCategories = async () => await axios.get(`${url}`);