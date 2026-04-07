import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("Dados da conta atualizados com sucesso!");

      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error("Erro ao atualizar: " + err.message),
  });

  return { updateUser, isUpdating };
}
