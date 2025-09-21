import { useAuth } from "../hooks/useAuth";
const Navbar = () => {
  const { user, logout } = useAuth();
  console.log(user);
  return (
    <div>
      <div className=" bg-sky-400 p-3 flex justify-around items-center">
        {user && <p>{user.name}</p>}
        <div>
          {user ? (
            <button onClick={() => logout()}>Log out</button>
          ) : (
            <button>Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
