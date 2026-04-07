import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteContrato as deleteContratoApi } from "../../services/apiContratos";

export function useDeleteContrato() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteContrato } = useMutation({
    mutationFn: deleteContratoApi,
    onSuccess: () => {
      toast.success("Contrato successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["contratos"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteContrato };
}
