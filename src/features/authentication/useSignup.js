import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Corretor cadastrado com sucesso! Por favor, verifique o e-mail informado para confirmar a conta.",
      );
    },
    onError: (err) => {
      toast.error("Erro ao cadastrar: " + err.message);
    },
  });

  return { signup, isLoading };
}
