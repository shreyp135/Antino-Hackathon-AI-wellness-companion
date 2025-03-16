import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./auth_pages/Signup";
import Signin from "./auth_pages/Signin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
