import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useEditSettings() {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            toast.success('Settings Updated Successfully');
            queryClient.invalidateQueries('settings');
        },
        onError: (e) => {
            toast.error(`Update Failed: ${e.message}`);
            queryClient.invalidateQueries('settings');
        }
    });

    return { updateSetting: mutate, isUpdating: isLoading };
}