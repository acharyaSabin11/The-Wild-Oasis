import { useQuery } from "@tanstack/react-query";
import { getTodaysActivities } from "../../services/apiBookings";

export default function useTodaysActivities() {
    const { data, error, isLoading } = useQuery({
        queryFn: getTodaysActivities,
        queryKey: ['todays-activites']
    });

    return { todaysActivities: data, todaysActivitiesIsLoading: isLoading, todaysActivitiesError: error }
}