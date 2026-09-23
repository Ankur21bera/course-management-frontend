import axios from 'axios';

export const backendUrl = "https://course-management-backend-pink.vercel.app";

const api = axios.create({baseURL:`${backendUrl}/api/user`});
export const Mentorapi = axios.create({baseURL:`${backendUrl}/api/mentor`});

api.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem("userToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},(error)=>{
    return Promise.reject(error);
})

export default api;
