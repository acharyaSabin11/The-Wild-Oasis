import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export default function useCabinsData() {
    //Use query to fetch data
    const {
        isLoading,
        error,
        data = [],
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,

    });

    return { isLoading, cabinsLoadingError: error, cabins: data }
}