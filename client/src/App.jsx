import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path='/signup' element /> */}
      </Routes>
    </>
  );
}

export default App;
