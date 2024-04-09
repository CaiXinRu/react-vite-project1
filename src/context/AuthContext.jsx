import { createContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthService";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const checkLoginStatus = async () => {
      let cuser = isAuthenticated();
      console.log(cuser);
      if (Object.keys(cuser).length === 0) {
        localStorage.setItem("token", "");
        cuser = "";
      }
      setCurrentUser(cuser);
    };
    checkLoginStatus();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
