import { useQuery } from "@tanstack/react-query";
import { getRecentBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('last');
    const { data, error, isLoading } = useQuery({
        queryFn: () => getRecentBookings(Number(searchValue)),
        queryKey: ['bookings', `last-${searchValue}-days`]
    })

    return { recentBookings: data, recentBookingsError: error, recentBookingsLoading: isLoading };
}