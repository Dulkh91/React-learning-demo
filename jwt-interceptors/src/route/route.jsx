import { createBrowserRouter } from "react-router";
import LoginPage from "../components/login";
import Layout from "../layout/layout";
import ProfilePage from "../components/profile";
import CreateUser from "../components/createUser";

 const router = createBrowserRouter([
        {path: '/', 
        element:<Layout/>,
        children:[
            {
            path: 'login',
            element: <LoginPage/>
            },
            {path: '/create-user', element: <CreateUser/>}
        ]
    },
    {
        path: '/',
        element: <Layout/>,
        children:[
            {index: true, element: <ProfilePage/>}
        ]
    }
 ])

 export default router