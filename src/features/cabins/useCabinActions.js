import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createCabinApi,
  deleteCabinApi,
  editCabinApi,
} from "../../services/apiCabins";

export const useCabinActions = () => {
  const queryClient = useQueryClient();

  const setInvalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["cabins"],
    });
  };

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      setInvalidateQuery();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditting } = useMutation({
    mutationFn: ({ formData, cabinId, oldImageUrl }) =>
      editCabinApi(formData, cabinId, oldImageUrl),
    onSuccess: () => {
      toast.success("Cabin successfully editted");
      setInvalidateQuery();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      setInvalidateQuery();
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    isEditting,
    isDeleting,

    createCabin,
    editCabin,
    deleteCabin,
  };
};
