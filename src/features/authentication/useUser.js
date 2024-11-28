import { useQuery } from "@tanstack/react-query";

import { getCurrentUserApi } from "../../services/apiAuth";

export const useUser = () => {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,
  });

  return {
    user,
    isAuthenticated: user?.role === "authenticated",

    isLoadingUser,
  };
};
