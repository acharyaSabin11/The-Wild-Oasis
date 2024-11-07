import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useSettingsData() {
    //Use query to fetch data
    const {
        isLoading,
        error,
        data,
    } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });

    return { isLoading, settingsLoadingError: error, settings: data }
}