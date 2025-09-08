import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "/",
    withCredentials: true,
});

function logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
}

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token) {
        
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401) {
            logout();
        }
    }
)

export default axiosInstance;