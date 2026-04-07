import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContrato } from "../../services/apiContratos";
import { toast } from "react-hot-toast";

export function useSaida() {
  const queryClient = useQueryClient();

  const { mutate: saida, isLoading: isIniciogOut } = useMutation({
    mutationFn: (contratoId) =>
      updateContrato(contratoId, {
        status: "saida",
      }),

    onSuccess: (data) => {
      toast.success(`Contrato #${data.id} encerrado com sucesso!`);

      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("Houve um erro ao encerrar o contrato."),
  });

  return { saida, isIniciogOut };
}
