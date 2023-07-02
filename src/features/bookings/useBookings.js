import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterParam = searchParams.get("status");
  const sortByParam = searchParams.get("sortBy");

  const filter =
    !filterParam || filterParam === "all"
      ? null
      : { field: "status", value: filterParam };

  // Sort
  let sortBy;

  if (sortByParam) {
    const [sortByField, sortByOrder] = sortByParam.split("-");

    sortBy = { field: sortByField, order: sortByOrder };
  }

  // Pagination
  const page = +(searchParams.get("page") || 1);

  // Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
};
