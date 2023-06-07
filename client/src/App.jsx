import { useNavigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { useSelector } from "react-redux";
import { selectIsAuth } from "./redux/slices/auth";
import { useEffect } from "react";

function App() {
  const isAuth = useSelector(selectIsAuth);
  console.log(isAuth);
  const navigate = useNavigate();
  useEffect(()=>{

    if(!isAuth && (window.location.pathname != '/signup')){
      console.log(window.location);
      return navigate("/login");
    }
  }, [isAuth, navigate])
  return (
    <>
      <Routes>
        <Route path='/' element={<div>h</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;