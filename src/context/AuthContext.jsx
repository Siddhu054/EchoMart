import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password, navigate) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "test@example.com" && password === "password") {
        const userData = {
          id: 1,
          email,
          name: "Test User",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name, navigate) => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        id: Date.now(),
        email,
        name,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
