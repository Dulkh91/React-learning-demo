import style from './login.module.css'
import { Button, Input } from "@mui/material";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const {login, isAuthenticated} = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = new FormData(e.target)
        const email = form.get('email');
        const password = form.get('password')
         await login(email,password)
    }
    
    if(isAuthenticated){
        return  navigate("/")
    }

    return ( <div className={style.form_container}>
        <h2>Login</h2>
        <form action="post" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <Input placeholder="Email" type="email" name="email"/>
            <label htmlFor="password">Password:</label>
            <Input placeholder="Password" type="password" name='password'/>
            <div className={style.container_button}>
                <Button variant='contained' type='submit'>Login</Button>
                <Button variant='contained' onClick={()=>navigate("/create-user")}>Create User</Button>
            </div>
        </form>
    </div> );
}
 
export default LoginPage;