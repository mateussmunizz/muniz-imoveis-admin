import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCliente as createClienteApi } from "../../services/apiClientes";

export function useCreateCliente() {
  const queryClient = useQueryClient();

  const { mutate: createCliente, isLoading: isCreating } = useMutation({
    mutationFn: createClienteApi,
    onSuccess: () => {
      toast.success("Novo inquilino cadastrado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCliente };
}
