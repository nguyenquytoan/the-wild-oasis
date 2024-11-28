import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBookingApi } from "../../services/apiBookings";

export const useBookingActions = () => {
  const queryClient = useQueryClient();

  const setInvalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["bookings"],
    });
  };

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      setInvalidateQuery;
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    deleteBooking,

    isDeletingBooking,
  };
};
