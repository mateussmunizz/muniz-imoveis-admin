import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContrato } from "../../services/apiContratos";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useInicio() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: inicio, isLoading: isIniciogIn } = useMutation({
    mutationFn: ({ contratoId, breakfast }) =>
      updateContrato(contratoId, {
        status: "inicio",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Contrato #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("There was an error while iniciog in"),
  });

  return { inicio, isIniciogIn };
}
