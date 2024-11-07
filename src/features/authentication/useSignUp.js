import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignUp() {
    const { mutate, isLoading } = useMutation({
        mutationFn: signUp,
        onError: (e) => {
            toast.error(e.message);
        },
        onSuccess: () => {
            toast.success('User Signed up Successfully. Login with that email to access that account.');

        }
    });

    return { signUp: mutate, isSigningUp: isLoading };
}