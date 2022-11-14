import { HomePage } from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import FooterComp from "./components/FooterComp";
import "./index.css";
import { login } from "./redux/userSlice";
import { VerificationPage } from "./pages/VerificationPage";
import NavbarComp from "./components/NavbarComp";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const keepLogin = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/users/keeplogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data);
      dispatch(login(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarComp />
              <HomePage />
            </>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification/:token" element={<VerificationPage />} />
      </Routes>
      <FooterComp />
    </div>
  );
}

export default App;
