import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBookingApi } from "../../services/apiBookings";

export const useBookingDetail = () => {
  const { bookingId } = useParams();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingApi(bookingId),
    retry: false,
  });

  return {
    booking,

    isLoading,
  };
};
