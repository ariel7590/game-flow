import axios from "axios";
import {localAPI} from "./routeUrls"

const axiosInstance=axios.create({
    baseURL: localAPI,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

export default axiosInstance;