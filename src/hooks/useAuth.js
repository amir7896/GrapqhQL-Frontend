import React, { createContext, useContext, useEffect, useState } from "react";

import LocalStorage from "../managers/LocalStorage";

const authContext = createContext();
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = LocalStorage.getUser();
    const storedToken = LocalStorage.getToken();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const logOut = async () => {
    LocalStorage.removeUser();
    LocalStorage.removeToken();
    setIsLoggedIn(false);
    setUser(null);
  };

  const signout = () => {
    logOut();
  };

  return {
    user,
    signout,
    isLoggedIn,
    setUser,
    setIsLoggedIn,
  };
}
