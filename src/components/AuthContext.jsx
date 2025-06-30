import React, { createContext, useState, useContext, useEffect } from 'react';
import  { apiLogin } from '../api';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // setLoading(true);
    try {
      const response = await apiLogin.post('/auth', { email, password },{withCredentials:true});
      if (response.data.code === 200) {
        const userData = { name: email };
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An unexpected error occurred. Please try again.',
      });
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiLogin.post('/auth/logout',{withCredentials:true});
      localStorage.removeItem('user')

    } catch (error) {
      console.error('Logout API call failed:', error);
    }
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 