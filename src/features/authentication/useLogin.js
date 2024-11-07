import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



export default function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
            navigate("/dashboard", { replace: true });
            toast.success("Logged In Successfully");
        },
        onError: (e) => {
            toast.error(e.message);
        },
    });

    return { login: mutate, isLoggingIn: isLoading };

}