import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./auth_page/Signup";
import Signin from "./auth_page/Signin";
import Feed from "./community_page/feed";
import Navbar from "./components/Navbar";
import Chatbot from "./chat_page/Chatbot";

function App() {
  return (
    < >
    <div className="h-screen">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<Signin/>} />
        <Route path="/community" element={<Feed/>} />
      </Routes>
      </div>
    </>
  );
}

export default App;
