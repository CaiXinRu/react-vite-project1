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

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const checkLoginStatus = () => {
    const token = getToken();
    setIsLoggedIn(!!token); // 使用!!轉換為布林值
  };

  const logOut = async () => {
    const token = getToken();
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

  const addTodo = async (content) => {
    const token = getToken();
    try {
      const response = await axios.post(
        `${apiUrl}/todos`,
        {
          todo: {
            content: content,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("AddTodo successful:", response);
    } catch (error) {
      console.log("AddTodo failed:", error.response);
    }
  };

  const getTodos = async () => {
    const token = getToken();
    try {
      const response = await axios.get(`${apiUrl}/todos`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("getTodos successful:", response.data.todos);
      return response;
    } catch (error) {
      console.log("getTodos failed:", error.response);
    }
  };

  const deleteTodo = async (id) => {
    const token = getToken();
    try {
      const response = await axios.delete(`${apiUrl}/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("deleteTodo successful:", response);
    } catch (error) {
      console.log("deleteTodo failed:", error.response);
    }
  };

  const toggleTodo = async (id) => {
    const token = getToken();
    try {
      const response = await axios.patch(
        `${apiUrl}/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("toggleTodo successful:", response);
    } catch (error) {
      console.log("toggleTodo failed:", error.response);
    }
  };

  const contextValue = {
    getToken,
    isLoggedIn,
    logOut,
    logIn,
    addTodo,
    getTodos,
    deleteTodo,
    toggleTodo,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
