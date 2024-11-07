import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from './../../services/apiBookings';
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";


export default function useBookingsData() {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const sortBy = searchParams.get('sortBy');
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const queryClient = useQueryClient();



    let sortDecomposed = ['created_at', 'dsc'];
    if (sortBy) {
        sortDecomposed = sortBy.split('-');
    }
    const [sortColumn, sortDirection] = sortDecomposed;

    const { isLoading, data = {}, error } = useQuery({
        queryFn: () => getBookings({ column: 'status', value: status }, { sortColumn, sortDirection }, page),
        queryKey: ['bookings', status, sortBy, page],
    })
    const count = data.count;

    //Prefetch queries
    if (page < Math.ceil(count / PAGE_SIZE)) {
        queryClient.prefetchQuery({
            queryFn: () => getBookings({ column: 'status', value: status }, { sortColumn, sortDirection }, page + 1),
            queryKey: ['bookings', status, sortBy, page + 1],
        })
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryFn: () => getBookings({ column: 'status', value: status }, { sortColumn, sortDirection }, page - 1),
            queryKey: ['bookings', status, sortBy, page - 1],
        })
    }

    return { isLoading, bookingsData: data.data, count: data.count, bookingsLoadingError: error }
}