import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
    //To access the invalidate method on query client;
    const queryClient = useQueryClient();
    //To mutate server state
    const { isLoading, mutate } = useMutation({
        mutationFn: (data) => createOrEditCabin(data, 'create'),
        onError: (e) => {
            toast.error(e.message);
        },
        onSuccess: () => {
            toast.success(
                `Cabin Created Successfully`
            );
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
    });

    return { isCreating: isLoading, createCabin: mutate };
}