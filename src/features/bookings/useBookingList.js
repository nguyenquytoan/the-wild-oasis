import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookingsApi } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

import { PAGE_SIZE } from "../../utils/constants";

export const useBookingList = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const sortByValue = searchParams.get("sortBy") || "start_date-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading: isBookingLoading, data: { data: bookings, count } = {} } =
    useQuery({
      queryKey: ["bookings", filter, sortBy, page],
      queryFn: () => getBookingsApi({ filter, sortBy, page }),
    });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page - 1 }),
    });
  }

  return {
    bookings,
    count,

    isBookingLoading,
  };
};
