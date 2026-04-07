import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditImovel } from "../../services/apiImoveis";

export function useCreateImovel() {
  const queryClient = useQueryClient();

  const { mutate: createImovel, isLoading: isCreating } = useMutation({
    mutationFn: createEditImovel,
    onSuccess: () => {
      toast.success("Imóvel cadastrado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["Imoveis"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createImovel };
}
