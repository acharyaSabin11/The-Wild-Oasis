import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: updateUser,
        onError: (e) => {
            toast.error(e.message);
        },
        onSuccess: () => {
            toast.success('Successfully Updated the User Details')
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    return { updateUser: mutate, isUpdating: isLoading };
}