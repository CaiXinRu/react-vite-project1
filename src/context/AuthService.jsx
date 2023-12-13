import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = `https://todoo.5xcamp.us`;

export const useAuth = () => {
  const navigate = useNavigate();

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
      return response.data;
    } catch (error) {
      console.error("Login/Signup failed:", error.response);
    }
  };

  const getToken = () => {
    return localStorage.getItem("token");
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
    } catch (error) {
      console.error("Logout failed:", error.response);
    }
  };

  const isAuthenticated = () => {
    const token = getToken();
    if (!token) {
      return {};
    }
    return token;
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
      console.error("AddTodo failed:", error.response);
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
      console.error("getTodos failed:", error.response);
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
      console.error("deleteTodo failed:", error.response);
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
      console.error("toggleTodo failed:", error.response);
    }
  };

  const editTodo = async (todo, todoId) => {
    const token = getToken();
    try {
      const response = axios.put(
        `${apiUrl}/todos/${todoId}`,
        {
          todo: {
            content: todo,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("editTodo successful:", response);
    } catch (error) {
      console.error("editTodo failed:", error.response);
    }
  };

  return {
    logIn,
    logOut,
    isAuthenticated,
    addTodo,
    getTodos,
    deleteTodo,
    toggleTodo,
    editTodo,
  };
};
