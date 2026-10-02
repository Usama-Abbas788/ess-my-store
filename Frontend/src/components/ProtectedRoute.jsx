import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

function ProtectedRoute() {
  const { token, data, isPending, isError, isInitializing } =
    useContext(AuthContext);

  if (isInitializing) {
    return <LoadingScreen title = {'Loading your account...'}/>
  }
  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isPending) {
    return <LoadingScreen title = {'Loading...'}/>;
  }

  if (isError || !data?.data) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
