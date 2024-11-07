import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
    //To access the invalidate method on query client;
    const queryClient = useQueryClient();
    //To mutate server state
    const { isLoading, mutate } = useMutation({
        mutationFn: ({ data, previousImage }) => createOrEditCabin(data, 'edit', previousImage),
        onError: (e) => {
            toast.error(e.message);
        },
        onSuccess: () => {
            toast.success(
                `Cabin Edited Successfully`
            );
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });

        },
    });

    return { isEditing: isLoading, editCabin: mutate };
}