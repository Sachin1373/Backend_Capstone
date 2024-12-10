import React,{Children, createContext,useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const navigate = useNavigate();

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('UserDetails'));
        const tokenExpiry = userDetails?.expiry;
    
        if (tokenExpiry && tokenExpiry > new Date().getTime()) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, [])

      const logout = () => {
        localStorage.removeItem('UserDetails');
        setIsLoggedIn(false);
        // navigate('/login');
      };

      const login = (details) => {
        localStorage.setItem('UserDetails', JSON.stringify(details));
        setIsLoggedIn(true);
      };

      return (
        <AuthContext.Provider
          value={{
            isLoggedIn,
            login,
            logout,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}