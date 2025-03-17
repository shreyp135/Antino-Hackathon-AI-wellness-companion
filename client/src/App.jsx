import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./auth_pages/Signup";
import Signin from "./auth_pages/Signin";
import Feed from "./community_pages/feed";

function App() {
  return (
    < >
    <div className="h-screen">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/community" element={<Feed/>} />
      </Routes>
      </div>
    </>
  );
}

export default App;
