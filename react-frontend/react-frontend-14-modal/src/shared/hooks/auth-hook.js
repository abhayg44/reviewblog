import { useState, useCallback, useEffect } from "react";

let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationData, setTokenExpirationiDate] = useState();
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationData =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationiDate(tokenExpirationData);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationData.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationiDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationData) {
      const remainingTime = tokenExpirationData - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationData]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (
      storedUser &&
      storedUser.token &&
      new Date(storedUser.expiration) > new Date()
    ) {
      login(
        storedUser.userId,
        storedUser.token,
        new Date(storedUser.expiration)
      );
    }
  }, [login]);
  return { userId, token, login, logout };
};
