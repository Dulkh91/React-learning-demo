import {useState,useEffect} from "react";
import { AuthService } from "../server/authSever";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsloading] = useState(true)
    
    useEffect(()=>{
        checkAuth()
    },[])

    const checkAuth = async()=>{
        if(AuthService.isAuthenticated()){
            try {
                const userData = await AuthService.getCurrentUser()
                setUser(userData)
            } catch (error) {
                console.error('Auth check failed:', error);
                AuthService.logout();
            }
        }
        setIsloading(false)
    }

    const login = async (email, password)=>{
            await AuthService.login(email,password)
            const userData = await AuthService.getCurrentUser()
            setUser(userData)
            return userData
    };
    const logout = ()=>{
        AuthService.logout()
        setUser(null)
    };

    const register = async (userData) => {
        // console.log(userData);
        const res = await AuthService.register(userData);
        if (res) {
            const currentUser = await AuthService.getCurrentUser();
            setUser(currentUser);
            console.log(userData.email);
        }
       
        return res;
    };

    const value = {
        user,
        login, 
        logout,
        isLoading,
        register,
        isAuthenticated: AuthService.isAuthenticated()
    }
    return (<AuthContext.Provider value={value}>
            {children}
    </AuthContext.Provider>);
}
 
export default AuthProvider;