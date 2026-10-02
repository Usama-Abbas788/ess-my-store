import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "../hooks/useLogoutMutation";
import { clearAccessToken } from "../services/apiService";

function AdminLayout() {
  const navigate = useNavigate();
  const {
    mutate: logout,
    isPending,
  } = useLogoutMutation();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        clearAccessToken();
        navigate("/");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">
            MyStore Admin
          </h1>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            {isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;