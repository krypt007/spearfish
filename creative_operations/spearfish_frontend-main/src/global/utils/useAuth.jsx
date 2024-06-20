import { useState, useEffect } from "react";
import {
  saveJWT, getJWT, saveToSessionStorage, getFromSessionStorage,
  deleteFromSessionStorage, deleteJWT
} from "./security";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const token = await getJWT(process.env.REACT_APP_SECRET_KEY);
      const existingUser = await getFromSessionStorage('user');
      if (token && existingUser) {
        setIsLoggedIn(true);
        setUser(JSON.parse(existingUser));
      }
    }
    setData();
  }, []);

  const login = async (user, token) => {
    try {
      const encryptedToken = await saveJWT(token);
      await saveToSessionStorage('user', JSON.stringify(user));
      setIsLoggedIn(true);
      setUser(user);
      return encryptedToken;
    } catch (e) {
      return false;
    }
  }

  const logout = async () => {
    await deleteJWT();
    await deleteFromSessionStorage('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  }

  const getIsLoggedIn = async () => {
    const token = await getJWT(process.env.REACT_APP_SECRET_KEY);
    const existingUser = await getFromSessionStorage('user');
    if (token && existingUser) {
      return true;
    }
    return false;
  }

  return { isLoggedIn, getIsLoggedIn, user, login, logout };
}

export default useAuth;
