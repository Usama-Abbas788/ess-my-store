import { useMutation } from "@tanstack/react-query";
import { register } from "../services/authService";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
  });
};