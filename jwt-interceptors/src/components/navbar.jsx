import style from './navbar.module.css'
import { useAuth } from '../hooks/useAuth';
const Navbar = () => {
    const {user,logout} = useAuth()
    return ( <div className={style.navbar_container}>
            {user&& <button onClick={()=>logout()} style={{cursor: 'pointer'}}>Logout</button>}
    </div> );
}
 
export default Navbar;