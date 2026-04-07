import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createContrato as createContratoApi } from "../../services/apiContratos";

export function useCreateContrato() {
  const queryClient = useQueryClient();

  const { mutate: createContrato, isLoading: isCreating } = useMutation({
    mutationFn: createContratoApi,
    onSuccess: () => {
      toast.success("Nova locação registrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["contratos"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createContrato };
}
