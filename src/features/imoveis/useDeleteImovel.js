import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteImovel as deleteImovelApi } from "../../services/apiImoveis";

export function useDeleteImovel() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteImovel } = useMutation({
    mutationFn: deleteImovelApi,
    onSuccess: () => {
      toast.success("Imóvel excluído com sucesso!");

      queryClient.invalidateQueries({
        queryKey: ["Imoveis"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteImovel };
}
