import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useBookingDataById(id) {
    const { data = {}, error, isLoading } = useQuery({
        queryFn: () => getBookingById(id),
        queryKey: ['booking', id],
        onError: (e) => {
            toast.error(e.message);
        },
        retry: false,
    })

    return { bookingData: data, bookingError: error, bookingIsLoading: isLoading };
}