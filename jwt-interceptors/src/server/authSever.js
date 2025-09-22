import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./api";

const api = axios.create({
    baseURL:API_BASE_URL
})

// Add token to requests automatically
api.interceptors.request.use((config)=>{
    const token = Cookies.get('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const AuthService = {
    login: async (email,password)=>{
        try {
            const res = await api.post('/auth/login',{
                email,
                password
            })
            if(res.data.access_token){
                Cookies.set('token', res.data.access_token,{expires: 7})
                return res.data
            }
        } catch (error) {
            throw error.data || error.message
        }
    },

    // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: ()=>{
      Cookies.remove('token')
  },

  // Check if user is authenticated
  isAuthenticated: ()=>{
    return !!Cookies.get('token')
  }
}
 

export default api