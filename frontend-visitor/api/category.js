import axios from 'axios';

const url = `${process.env.BACKEND_DOMAIN || "http://localhost:8080"}/api/v1/categories`;

export const getCategories = async () => await axios.get(`${url}`);