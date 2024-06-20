import { useState, useEffect } from "react";
import useAuth from "../global/utils/useAuth";
import { Navigate } from "react-router-dom";

const LoginGuard = ({ Component }) => {
  const { getIsLoggedIn } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  useEffect(() => {
    const requireLogin = async () => {
      const loggedIn = await getIsLoggedIn();
      setIsLoggedIn(() => (loggedIn));
    }

    requireLogin();
  }, [getIsLoggedIn]);

  if (isLoggedIn === undefined) {
    return null; // or loading indicator, spinner, etc
  }

  return (!isLoggedIn ?
    (
      <Component />
    )
    : (
      <Navigate to='/login' replace={true} />
    ));
}

export default LoginGuard;
