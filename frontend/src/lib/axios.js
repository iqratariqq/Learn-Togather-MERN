import axios from 'axios'

const axiosInstance=axios.create({
    // baseURL:"http://localhost:3000/api", //in case of localhost
    baseURL:"https://chatme-backend-liart.vercel.app/api", // deployment
    withCredentials: true,
})

export default axiosInstance;