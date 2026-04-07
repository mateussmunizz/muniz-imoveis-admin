import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Configuração atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) =>
      toast.error("Erro ao atualizar configuração: " + err.message),
  });

  return { isUpdating, updateSetting };
}
