import { useState } from "react";
import { useForgotPasswordMutation } from "../hooks/useForgotPasswordMutation";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, isError, error, data } =
    useForgotPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Forgot Password
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {isSuccess && (
          <p className="mt-4 text-sm text-green-600">{data?.message}</p>
        )}

        {isError && (
          <p className="mt-4 text-sm text-red-600">
            {error?.response?.data?.message || "Something went wrong."}
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
