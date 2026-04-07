import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getContratosAfterDate } from "../../services/apiContratos";

export function useRecentContratos() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: contratos } = useQuery({
    queryFn: () => getContratosAfterDate(queryDate),
    queryKey: ["contratos", `last-${numDays}`],
  });

  return { isLoading, contratos };
}
