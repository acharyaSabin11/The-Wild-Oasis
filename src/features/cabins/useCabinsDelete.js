import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCabinDelete() {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: deleteCabins,
        onError: () => {
            toast.error("Couldn't Delete the Cabin");
        },
        onSuccess: () => {
            toast.success("Cabin Deleted Successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
    });

    return { deleteCabin: mutate, isDeleting: isLoading };
}