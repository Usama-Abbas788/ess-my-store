import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../services/authService";

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};