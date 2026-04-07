import styled from "styled-components";
import Stats from "./Stats";
import { useRecentContratos } from "./useRecentContratos";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import TodayActivity from "../vistoria/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import { useImoveis } from "../imoveis/useImoveis";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1.6rem;
  }
`;

function DashboardLayout() {
  const { contratos, isLoading: isLoading1 } = useRecentContratos();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();

  const { imoveis, isLoading: isLoading3 } = useImoveis();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        contratos={contratos}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={imoveis?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart contratos={contratos} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
