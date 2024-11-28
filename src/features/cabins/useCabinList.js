import { useQuery } from "@tanstack/react-query";

import { getCabinsApi } from "../../services/apiCabins";

export const useCabinList = () => {
  const { isLoading: isCabinLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsApi,
  });

  return {
    cabins,

    isCabinLoading,
  };
};
