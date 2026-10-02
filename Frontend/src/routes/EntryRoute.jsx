import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Login from "../pages/Login";
import LoadingScreen from "../components/LoadingScreen";

function EntryRoute() {
  const { token, isInitializing } = useContext(AuthContext);

  if (isInitializing) {
    return <LoadingScreen title = {'Loading your account...'}/>;
  }

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <Login />;
}

export default EntryRoute;