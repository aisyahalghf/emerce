import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/Register";
import Home from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/Register" element={<RegisterUser />} />
    </Routes>
  );
}

export default App;
