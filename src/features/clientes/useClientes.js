import { useQuery } from "@tanstack/react-query";
import { getClientes } from "../../services/apiClientes";

export function useClientes() {
  const { isLoading, data: clientes } = useQuery({
    queryKey: ["clientes"],
    queryFn: getClientes,
  });

  return { isLoading, clientes };
}
