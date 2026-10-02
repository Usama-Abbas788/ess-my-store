import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

function AdminRoute() {
  const { token, data, isPending, isError, isInitializing } =
    useContext(AuthContext);

  if (isInitializing) {
    return <LoadingScreen title = {'Loading your account...'}/>
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"></div>

          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading MyStore...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    localStorage.removeItem("token");

    return <Navigate to="/" replace />;
  }

  const user = data.data;

  if (user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
