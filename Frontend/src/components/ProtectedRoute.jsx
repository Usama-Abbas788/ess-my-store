import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/authSelectors";

function ProtectedRoute() {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;