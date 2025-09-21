import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
const Login = () => {
    const {login} = useAuth()
    const [formError, setFormError] = useState(null)

   const handleSubmit = async(e)=>{
        e.preventDefault()
        const form = new FormData(e.target)
        const email = form.get('email')
        const password = form.get('password')

        try {
            await login(email, password)
        } catch (error) {
            setFormError(error.message)
        }

   }

    return(<div>
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit} className=" flex items-center">
            <label htmlFor="email">Email: </label>
            <input 
                type="text" 
                name="email" 
            />
            <label htmlFor="password" className="block">Password: </label>
            <input 
                type="password" 
                name="password" 
            />

            <button type="submit"> Submit</button>
        </form>
        {formError &&<p>{formError}</p>}
        <hr />
        <p>email: john@mail.com</p>
        <p>password: changeme</p>
    </div>)
}
 
export default Login;