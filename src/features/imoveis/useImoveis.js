import { useQuery } from "@tanstack/react-query";
import { getImoveis } from "../../services/apiImoveis";

export function useImoveis() {
  const {
    isLoading,
    data: imoveis,
    error,
  } = useQuery({
    queryKey: ["imoveis"],
    queryFn: getImoveis,
  });

  return { isLoading, error, imoveis };
}
