import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ contratos, confirmedStays, numDays, cabinCount }) {
  const numContratos = contratos.length;

  // CÁLCULO DE FATURAMENTO REAL DA IMOBILIÁRIA (Corrigido)
  const faturamentoTotal = contratos.reduce((acc, contrato) => {
    // Blindagem: Se a data não vier do banco, não quebra a tela
    if (!contrato.startDate) return acc;

    const hoje = new Date();
    const dataInicio = new Date(contrato.startDate);

    // Calcula a diferença em dias (se começou no passado fica negativo, se é futuro fica positivo)
    const diffDias = (dataInicio - hoje) / (1000 * 60 * 60 * 24);

    // Se o contrato começou há 30 dias ou menos, OU se vai começar no futuro, a imobiliária ganha 100%
    const isPrimeiroMes = diffDias >= -30;

    if (isPrimeiroMes) {
      return acc + contrato.totalPrice;
    } else {
      return acc + contrato.totalPrice * 0.08; // 8% nos meses subsequentes
    }
  }, 0);

  const checkins = confirmedStays.length;
  const occupation =
    cabinCount > 0 ? Math.round((checkins / cabinCount) * 100) : 0;

  return (
    <>
      <Stat
        title="Novos Contratos"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numContratos}
      />
      <Stat
        title="Faturamento Bruto"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(faturamentoTotal)}
      />
      <Stat
        title="Contratos Ativos"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Taxa de Ocupação"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupation + "%"}
      />
    </>
  );
}

export default Stats;
