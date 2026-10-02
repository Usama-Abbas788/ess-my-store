import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/authService";

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};