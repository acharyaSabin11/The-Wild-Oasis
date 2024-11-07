import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"

export default function useDeleteBooking(id) {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: () => deleteBooking(id),
        onSuccess: () => {
            toast.success('Deleted Booking Successfully');
            queryClient.invalidateQueries({ active: true });
        },
        onError: (e) => {
            toast.error(e.message);
        }
    })



    return { deleteBooking: mutate, isDeletingBooking: isLoading }
}