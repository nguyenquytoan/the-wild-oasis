import { useQuery } from "@tanstack/react-query";
import { getSettingsApi } from "../../services/apiSettings";

export const useSettingList = () => {
  const { data: settings, isLoading: isSettingsLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return {
    settings,

    isSettingsLoading,
  };
};
