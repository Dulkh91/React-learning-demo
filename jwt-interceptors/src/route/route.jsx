import { createBrowserRouter } from "react-router";
import LoginPage from "../components/login";
import Layout from "../layout/layout";
import ProfilePage from "../components/profile";

 const router = createBrowserRouter([
        {path: '/login', 
        element:<Layout/>,
        children:[
            {
            index: true,
            element: <LoginPage/>
            },
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