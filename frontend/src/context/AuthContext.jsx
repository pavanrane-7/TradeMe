import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import api from "../services/api";

const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "trademe-user"
      );

    if (storedUser) {

      try {

        const parsedUser =
          JSON.parse(
            storedUser
          );

        setUser(parsedUser);

      } catch (error) {

        localStorage.removeItem(
          "trademe-user"
        );
      }
    }

    setLoading(false);

  }, []);

  const login = async (
    email,
    password
  ) => {

    try {

      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "trademe-user",
        JSON.stringify(
          res.data
        )
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      setUser(res.data);

      return true;

    } catch (error) {

      console.log(error);

      return false;
    }
  };

  const register = async (
    name,
    email,
    password
  ) => {

    try {

      const res =
        await api.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

      localStorage.setItem(
        "trademe-user",
        JSON.stringify(
          res.data
        )
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      setUser(res.data);

      return true;

    } catch (error) {

      console.log(error);

      return false;
    }
  };

  const logout = () => {

    localStorage.removeItem(
      "trademe-user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(
    AuthContext
  );