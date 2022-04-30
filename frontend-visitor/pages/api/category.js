import axios from 'axios';

const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/categories`;

export const getCategories = async () => await axios.get(`${url}`);