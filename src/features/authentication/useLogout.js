import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast.success('Logged Out Successfully');
            navigate('/login', { replace: true });
            queryClient.removeQueries();
        },
        onError: (e) => {
            toast.error(e.message)
        }
    });
    return { logout: mutate, isLoggingOut: isLoading };
}