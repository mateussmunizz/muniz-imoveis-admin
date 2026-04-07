import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditImovel } from "../../services/apiImoveis";
import { toast } from "react-hot-toast";

export function useEditImovel() {
  const queryClient = useQueryClient();

  const { mutate: editImovel, isLoading: isEditing } = useMutation({
    mutationFn: ({ newImovelData, id }) => createEditImovel(newImovelData, id),
    onSuccess: () => {
      toast.success("Imóvel atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["Imoveis"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editImovel };
}
