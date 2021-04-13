import React, { createContext, useContext, useEffect, useState } from "react";
import App from "../components/layouts/App";
import { api } from "../utils/api";

const AuthContext = createContext({
  signed: true,
  loading: true,
  authToken: {},
  user: {},
  saveAuthToken: (data) => { },
  logout: () => { },
  getDataUser: () => { },
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function loadStorageData() {
      const storageAuth = localStorage.getItem("@Auth:token");
      const storageUser = localStorage.getItem("@Auth:user");

      if (storageAuth) {
        const data = JSON.parse(storageAuth);

        api.defaults.headers["Authorization"] = `Bearer ${data.content.token}`;

        if (storageUser) {
          setUser(JSON.parse(storageUser));
        }

        setAuthToken(data);
      }

      setLoading(false);
    })();
  }, []);

  async function getDataUser() {
    const {
      data: { response },
    } = await api.get("user");
    setUser(response);
    localStorage.setItem("@Auth:user", JSON.stringify(response));
  }

  async function saveAuthToken(data) {
    localStorage.setItem("@Auth:token", JSON.stringify(data));
    setAuthToken(data);
    const { content: { token } } = data;
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  async function logout() {
    localStorage.clear();
    setAuthToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!authToken,
        loading,
        user,
        authToken,
        saveAuthToken,
        logout,
        getDataUser,
      }}
    >
      {!authToken ? children : (
        <App children={children} />
      )}
    </AuthContext.Provider>
  );
};

export function useAuth() { return useContext(AuthContext); }
