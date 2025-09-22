import { Outlet } from "react-router";
import AuthProvider from "../context/AuthProvider";
import Navbar from "../components/navbar";
const Layout = () => {
    return ( <div>
        <AuthProvider>
            <Navbar/>
            <main><Outlet/></main>
        </AuthProvider>
        
    </div> );
}
 
export default Layout;