import { useState } from "react";
import { useSearchParams, useNavigate, Link, Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "../hooks/useResetPasswordMutation";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { mutate, isPending, isError, error } = useResetPasswordMutation();

  const validationErrors = error?.response?.data?.errors;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    mutate(
      {
        email,
        token,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };
  if (!token || !email) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Reset Password
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              New Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-gray-900"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {validationErrors?.password && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.password[0]}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password_confirmation"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="password_confirmation"
                name="password_confirmation"
                type={showPasswordConfirmation ? "text" : "password"}
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-gray-900"
                required
              />

              <button
                type="button"
                onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
              >
                {showPasswordConfirmation ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {validationErrors?.password_confirmation && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.password_confirmation[0]}
              </p>
            )}
          </div>

          {/* General Error */}
          {isError &&
            !validationErrors?.password &&
            !validationErrors?.password_confirmation && (
              <p className="text-sm text-red-600">
                {error?.response?.data?.message || "Unable to reset password."}
              </p>
            )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-4 block text-center text-sm text-gray-600 hover:text-gray-900"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;
