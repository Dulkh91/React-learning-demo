import style from "./profile.module.css";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const ProfilePage = () => {

  const {user,isAuthenticated, isLoading} = useAuth();
  
    if(!isAuthenticated){
    return <Navigate to={"login"}/>
  }

  return (
    <div className={style.profile_container}>
      {isLoading?(<p>Loading.....</p>) :(
        <div>
            <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
