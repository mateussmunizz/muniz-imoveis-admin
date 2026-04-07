import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getContrato } from "../../services/apiContratos";

export function useContrato() {
  const { contratoId } = useParams();

  const {
    isLoading,
    data: contrato,
    error,
  } = useQuery({
    queryKey: ["contrato", contratoId],
    queryFn: () => getContrato(contratoId),
    retry: false,
  });

  return { isLoading, error, contrato };
}
