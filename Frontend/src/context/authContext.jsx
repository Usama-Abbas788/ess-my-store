import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("users")) || [],
  );
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem("currentUser")) || [],
  );
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    localStorage.removeItem("currentUser");
  }, [currentUser]);
  const signup = (userData) => {
    const existingUser = users.find((user) => user.email == userData.email);
    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: "user",
    };
    setUsers((previousUers) => [...previousUers, newUser]);
    return {
      success: true,
      message: "Account created successfully.",
    };
  };
  const login = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    setCurrentUser(user);

    return {
      success: true,
      message: "Login successful",
      user,
    };
  };
  const logout = () => {
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
