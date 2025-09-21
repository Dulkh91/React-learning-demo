import "./App.css";
import Login from "./components/login";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar/>
        <div>
          <Login />
        </div>
    </>
  );
}

export default App;
