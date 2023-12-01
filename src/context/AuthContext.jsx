// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const apiUrl = `https://todoo.5xcamp.us`;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 使用!!轉換為布林值
  };

  const logOut = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${apiUrl}/users/sign_out`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Logout successful");
      localStorage.removeItem("token");
      checkLoginStatus();
    } catch (error) {
      console.log("Logout failed:", error.response);
    }
  };

  const logIn = async (email, password, isSignUp) => {
    try {
      const response = await axios.post(
        isSignUp ? `${apiUrl}/users` : `${apiUrl}/users/sign_in`,
        {
          user: {
            email: email,
            password: password,
          },
        }
      );

      console.log("Login/Signup successful:", response);
      navigate("/");

      if (!isSignUp) {
        localStorage.setItem("token", response.headers.authorization);
      }

      checkLoginStatus();
    } catch (error) {
      console.log("Login/Signup failed:", error.response);
    }
  };

  const contextValue = {
    isLoggedIn,
    logOut,
    logIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
