import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useSettingActions = () => {
  const queryClient = useQueryClient();

  const setInvalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["settings"],
    });
  };

  const { mutate: updateSetting, isLoading: isEditting } = useMutation({
    mutationFn: ({ formData }) => updateSettingApi(formData),
    onSuccess: () => {
      toast.success("Cabin successfully editted");
      setInvalidateQuery();
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    updateSetting,

    isEditting,
  };
};
