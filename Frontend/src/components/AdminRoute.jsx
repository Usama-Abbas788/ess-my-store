import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/authSelectors";

function AdminRoute() {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;