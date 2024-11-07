import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../../services/apiAuth";

export default function useUser() {
    const { data: user, isLoading } = useQuery({
        queryFn: getAuthenticatedUser,
        queryKey: ['user'],
    });

    return { user, isGettingUser: isLoading, isAuthenticated: user?.user?.role === 'authenticated' };
}