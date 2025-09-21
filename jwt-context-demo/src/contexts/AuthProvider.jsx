import { useState,useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { API_BASE_URL } from "../server/api";


export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [isLoading, setIsloading]= useState(false)
    const [token, setTokent] = useState(localStorage.getItem('jwtToken')|| null)

    // const API_BASE_URL = "https://api.escuelajs.co/api/v1"

    useEffect(()=>{
        checkAuth()
    },[])

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('jwtToken')
            if(!token) return
                
            const res = await axios.get(`${API_BASE_URL}/auth/profile`,{
                headers: {Authorization: `Bearer ${token}`}
            })
            setUser(res.data)
            setTokent(token)
        } catch (error) {
            console.error('Login failed:', error);
            localStorage.removeItem('jwtToken');
            setTokent(null)
            setUser(null)
        
        }
    }

    // មុខងារសម្រាប់ Login
    const login = async (email, password) => {
        setIsloading(true)
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`,{
                email,password
            })
            const {access_token} = res.data
            localStorage.setItem('jwtToken', access_token)
            setTokent(access_token)

            // ទទួលបានព័ត៌មានអ្នកប្រើប្រាស់
            const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`,{
                headers: {Authorization: `Bearer ${access_token}`}
            })
            setUser(profileResponse.data)

        } catch (error) {
            console.error('Login failed:', error);
            // ចាំបាច់ត្រូវលុប token ចេញ ប្រសិនបើមានបញ្ហា
            localStorage.removeItem('jwtToken');
            setTokent(null)
            setUser(null)
            throw error
        }finally{
            setIsloading(false)
        }
    }

    // មុខងារសម្រាប់ Logout
    const logout = ()=>{
        localStorage.removeItem('jwtToken')
        setUser(null)
        setTokent(null)
    }

    const value = {
        user,
        isLoading,
        token,
        login,
        logout,
        isAuthenticated: !!user && !! token // ស្ថានភាពថាតើអ្នកប្រើប្រាស់បានចូលឬអត់
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
