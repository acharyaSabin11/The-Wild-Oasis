import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBookingData } from "../../services/apiBookings";

export default function useBookingsUpdate(id) {
    const queryClient = useQueryClient();
    const { mutate, isLoading, data } = useMutation(
        {
            mutationFn: (updateValue) => updateBookingData(id, updateValue),
            onError: () => {
                toast.error("Booking Couldn't be updated");
            },
            onSuccess: () => {

                queryClient.invalidateQueries({ queryKey: ['booking', id.toString()] });
            }
        }

    );

    return { updateBooking: mutate, isUpdating: isLoading, updatedBooking: data }

}