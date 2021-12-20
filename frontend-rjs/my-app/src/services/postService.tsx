import { BASE_URL_UPLOAD_FILE } from "./constants"
import axios from 'axios';

const USER_URL = `${BASE_URL_UPLOAD_FILE}/post`

export const getPost = () => {
    return axios.get(USER_URL);
}

export const getPostById = (id: any) => {
    return axios.get(`${USER_URL}/${id}`);
}

export const createPost = (body: any) => {
    return axios.post(`${USER_URL}`, { ...body });
}

export const updatePost = (id:string, body: any) => {
    return axios.put(`${USER_URL}/${id}`, { ...body });
}

export const deletePost = (id:any) => {
    return axios.delete(`${USER_URL}/${id}`);
}