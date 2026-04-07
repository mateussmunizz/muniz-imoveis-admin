import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
    @media (max-width: 768px) {
      padding: 2.4rem 1.6rem;
      width: 100%;
      height: 400px;
      overflow: hidden;
    }
  }
`;

function SalesChart({ contratos, numDays }) {
  const { isDarkMode } = useDarkMode();

  const contratosValidos = contratos || [];

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "dd/MM"),

      totalSales: contratosValidos
        .filter((contrato) => isSameDay(date, new Date(contrato.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: contratosValidos
        .filter((contrato) => isSameDay(date, new Date(contrato.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce3" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Faturamento de {format(allDates.at(0), "dd/MM/yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "dd/MM/yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            tickMargin={12}
          />
          <YAxis
            unit=" R$"
            width={130}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            tickMargin={12}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Faturamento Total"
            unit=" R$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Taxas extras"
            unit=" R$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
