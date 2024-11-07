import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getRecentStays } from "../../services/apiBookings";

export default function useRecentStays() {
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('last');
    const { data, error, isLoading } = useQuery({
        queryFn: () => getRecentStays(Number(searchValue)),
        queryKey: ['stays', `last-${searchValue}-days`]
    });

    const confirmedStays = data?.filter((stays) => stays.status === 'checked-in' || stays.status === 'checked-out');
    return { recentStays: data, recentStaysError: error, recentStaysLoading: isLoading, confirmedStays, numNights: Number(searchValue) };
}