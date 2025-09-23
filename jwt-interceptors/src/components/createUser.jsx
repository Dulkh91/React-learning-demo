import style from './createUser.module.css'
import { Button, Input } from "@mui/material";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import { validateEmail } from '../utils/validated';
import { useState } from 'react';

const CreateUser = () => {
    const {register, isAuthenticated} = useAuth()
    const [errors,setErrors] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = new FormData(e.target)

        const formData = {
            username: form.get('username'),
            avatar: form.get('avatar'),
            email: form.get('email'),
            password: form.get('password'),
            comfirmPassword: form.get('ComfirmPassword')
        }

        // Validation
        const validationErrors = validateEmail(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await register({
                name: formData.username,
                avatar: formData.avatar,
                email: formData.email,
                password: formData.password
            })

            return  navigate("/")
        } catch (error) {
            setErrors({ submit: error.message || 'Registration failed' });  
        }

    }

    

    return ( <div className={style.form_container}>
        <h2>Create User</h2>
        <form action="post" onSubmit={handleSubmit}>
            <label htmlFor="username">User name:</label>
                <Input placeholder="user nane" type="text" name="username"/>
            <label htmlFor="avatar">Avatar:</label>
                <Input placeholder="url" type="text" name="avatar"/>
            <label htmlFor="email">Email:</label>
                <Input placeholder="Email" type="email" name="email"/>
            <label htmlFor="password">Password:</label>
                <Input placeholder="Password" type="password" name='password'/>
            <label htmlFor="comfirmPassword">Comfirm Password:</label>
                <Input placeholder="Comfirm Password" type="password" name='ComfirmPassword'/>
            <div className={style.container_button}>
                <Button variant='contained' type='submit'>Create User</Button>
                <Button variant='contained' onClick={()=>navigate("/login")} >Login</Button>
            </div>
        </form>
    </div> 
    );
}
 
export default CreateUser;