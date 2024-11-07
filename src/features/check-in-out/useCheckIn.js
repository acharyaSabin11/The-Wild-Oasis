import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingData } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckIn(id) {
    const queryClient = useQueryClient();
    const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
        mutationFn: () => updateBookingData(id, { status: 'checked-in' }),
        onSuccess: () => {
            toast.success(`Booking #${id} checked in successfully`);
            queryClient.invalidateQueries({ active: true });
        }
    })

    return { checkIn, isCheckingIn }
}