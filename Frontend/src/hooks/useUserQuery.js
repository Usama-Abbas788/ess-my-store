import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/authService";

export const useUserQuery = (token) => {
  return useQuery({
    queryKey: ["user", token],
    queryFn: getUser,
    enabled: !!token,
    retry: false,
  });
};