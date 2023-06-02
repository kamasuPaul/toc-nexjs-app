import axios, { AxiosInstance } from 'axios';
import { auth } from '../firebase/app';
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});
// Add a request interceptor
axiosInstance.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});
export default axiosInstance;