import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingData } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckOut(id) {
    const queryClient = useQueryClient();
    const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
        mutationFn: () => updateBookingData(id, { status: 'checked-out' }),
        onSuccess: () => {
            toast.success(`Booking #${id} checked out successfully`);
            queryClient.invalidateQueries({ active: true });
        }
    })

    return { checkOut, isCheckingOut }
}