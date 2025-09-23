import style from './navbar.module.css'
import { useAuth } from '../hooks/useAuth';
const Navbar = () => {
    const {logout, isAuthenticated} = useAuth()
    return ( <div className={style.navbar_container}>
            {isAuthenticated&& <button onClick={()=>logout()} style={{cursor: 'pointer'}}>Logout</button>}

    </div> );
}
 
export default Navbar;