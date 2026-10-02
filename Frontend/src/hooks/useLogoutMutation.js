import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/authService";

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
  });
};